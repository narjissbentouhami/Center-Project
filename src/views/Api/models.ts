import { URL_BASE_SERVER } from 'src/Constants/api'

export const getModels = async () => {
  try {
    const resp = await fetch(URL_BASE_SERVER + 'viewer/models')
    if (!resp.ok) {
      throw new Error(await resp.text())
    }
    const models = await resp.json()

    return models
  } catch (err) {
    alert('Could not list models. See the console for more details.')
    console.error(err)
  }
}

export const getModelStatus = async (urn: string) => {
  try {
    const resp = await fetch(URL_BASE_SERVER + `viewer/models/${urn}/status`)
    if (!resp.ok) {
      throw new Error(await resp.text())
    }
    const status = await resp.json()
    return status
  } catch (err) {
    alert('Could not load model. See the console for more details.')
    console.error(err)
  }
}

export const getAccessToken = async (callback: (arg0: any, arg1: any) => void) => {
  try {
    const resp = await fetch(URL_BASE_SERVER + 'viewer/auth/token')
    if (!resp.ok) {
      throw new Error(await resp.text())
    }
    const { access_token, expires_in } = await resp.json()
    callback(access_token, expires_in)
  } catch (err) {
    alert('Could not obtain access token. See the console for more details.')
    console.error(err)
  }
}

export const uploadModel = async (file: Blob | string) => {
  try {
    const data = new FormData()
    data.append('model-file', file)

    const resp = await fetch(URL_BASE_SERVER + 'viewer/models', {
      method: 'POST',
      body: data
    })
    if (!resp.ok) {
      throw new Error(await resp.text())
    }
    const model = await resp.json()
    return model
  } catch (err) {
    console.error(err)
  }
}
