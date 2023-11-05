import { ReactDOM } from 'react'
import { URL_BASE_SERVER } from 'src/Constants/api'
let start = new Date().getTime()
let MyVars = {
  keepTrying: true,
  uploadInParallel: true
}

export default async function uploadChunksAsync(file: any, options: any, callback: any) {
  const RETRY_MAX = 3
  const CHUNK_SIZE = 5 * 1024 * 1024 // 5 MB suggested
  const BATCH_SIZE = 5 // how many upload URLs are requested at a time
  const bucketName = 'bucketkey'
  const fileName = file.name
  const stepsMax = Math.floor(file.size / CHUNK_SIZE) + 1
  const finishedChunks = new Set()

  let getUrlsAsync = function (index: any, count: any, uploadKey: any) {
    console.log(`getUrlsAsync: index = ${index}, count = ${count}`)

    return new Promise(async (resolve, reject) => {
      console.log(`getUrlsPromises: index = ${index}`)

      // The lowest index accepted is 1 not 0, so I'm adding 1 to the indices used locally
      let url = `${URL_BASE_SERVER}uploadurls?bucketName=${bucketName}&objectName=${fileName}&index=${
        index + 1
      }&count=${count}`
      if (uploadKey) url += `&uploadKey=${uploadKey}`

      console.log(`getUrlsPromises.fetch: url = ${url}`)
      try {
        let res = await fetch(url, {
          method: 'GET'
        })

        let data = await res.json()

        resolve(data)
      } catch {
        reject('failed')
      }
    })
  }

  let readChunkAsync = function (file: any, start: any, end: any, total: any) {
    return new Promise((resolve, reject) => {
      console.log(`readChunkAsync: ${start} - ${end}`)

      var reader = new FileReader()
      var blob = file.slice(start, end)

      reader.onload = function (e) {
        var currentStart = start
        var currentEnd = start + e.loaded - 1
        var range = 'bytes ' + currentStart + '-' + currentEnd + '/' + total

        resolve({ readerResult: reader.result, range: range })
      }

      reader.readAsArrayBuffer(blob)
    })
  }

  let uploadChunkAsync = function (start: any, end: any, url: any) {
    console.log(`uploadChunkAsync: ${start} - ${end}`)
    return new Promise(async (resolve, reject) => {
      if (finishedChunks.has(start)) {
        resolve(200)
        return
      }

      try {
        let resRead: any = await readChunkAsync(file, start, end, file.size)

        console.log(`uploadChunkAsync.fetch: url=${url}`)

        let res = await fetch(url, {
          method: 'PUT',
          body: resRead.readerResult
        })

        if (res.status !== 200) {
          reject(res.status)
        } else {
          resolve(200)
          finishedChunks.add(start)
          callback('inprogress', Math.ceil((finishedChunks.size / stepsMax) * 100).toString() + '%')
        }
      } catch {
        reject(500)
      }
    })
  }

  let uploadBatchAsync = function (step: any, count: any, uploadKey: any) {
    console.log(`uploadBatchAsync: index=${step}, uploadKey=${uploadKey}`)
    return new Promise(async (resolve, reject) => {
      try {
        let promises = []

        let resUrls: any = await getUrlsAsync(step, count, uploadKey)
        uploadKey = resUrls.uploadKey

        for (let index = 0; index < count; index++) {
          const start = (step + index) * CHUNK_SIZE
          const end = start + CHUNK_SIZE
          promises.push(uploadChunkAsync(start, end, resUrls.urls[index]))

          if (!options.uploadInParallel) await promises[index]
        }

        // Whether some failed or not, let's wait for all of them resolve or one reject
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
        // It rejects immediately upon any of the input promises rejecting
        if (options.uploadInParallel) await Promise.all(promises)

        resolve(uploadKey)
      } catch {
        reject('failed')
      }
    })
  }

  let uploadKey
  for (let step = 0; step < stepsMax; step += BATCH_SIZE) {
    let retryCount = 0
    while (true) {
      try {
        const count = Math.min(stepsMax - step, BATCH_SIZE)
        uploadKey = await uploadBatchAsync(step, count, uploadKey)

        break
      } catch (ex) {
        if (MyVars.keepTrying && retryCount++ < RETRY_MAX) {
          console.log(`Wait for retry: retryCount=${retryCount}`)
          await new Promise(r => setTimeout(r, retryCount * 5000))
        } else {
          callback('cancelled')
          return
        }
      }
    }
  }

  let res = await fetch(`${URL_BASE_SERVER}uploadurls?bucketName=${bucketName}&objectName=${fileName}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      uploadKey
    })
  })
  let data = await res.json()
  console.log(data)
  if (data.status === 'error') {
    callback('failed')
  } else {
    callback('success')
  }
}

// uploadChunksAsync(this.files[0], { uploadInParallel: MyVars.uploadInParallel }, (state: any, message: any) => {
//   switch (state) {
//     case 'inprogress':
//       console.log('inprogress...' + message)

//       break

//     case 'failed':
//       console.log('failed...' + message)
//       $('#forgeUploadHidden').val('')
//       MyVars.keepTrying = true
//       break

//     case 'cancelled':
//       console.log('cancelled...' + message)
//       $('#forgeUploadHidden').val('')
//       MyVars.keepTrying = true
//       break

//     case 'success':
//       let end = new Date().getTime()
//       let diff = end - start
//       console.log(`${this.files[0].size} byte uploaded in ${diff} ms (parallel: ${MyVars.uploadInParallel})`)
//       console.log('success...' + message)

//       $('#forgeUploadHidden').val('')
//       MyVars.keepTrying = true
//       break
//   }
// })
