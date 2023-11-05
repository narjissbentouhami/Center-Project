import { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import React from 'react'
import { blobUrlToBase64 } from 'src/utils/image'
import { getScreenShots, postScreenShot } from 'src/views/Api/ScreenShot'
interface ScreenShotProps {
  viewer: Autodesk.Viewing.GuiViewer3D
}
export default function ScreenShot(props: ScreenShotProps) {
  const { viewer } = props
  const [images, setImages] = useState<any>([])

  useEffect(() => {
    let modelName = window.location.href.split('?')[1]?.split('=')[1]

    getScreenShots(modelName)
      .then(res => {
        setImages(res)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const triggerScreenShot = () => {
    let height = viewer.container.clientHeight
    let width = viewer.container.clientWidth
    viewer.getScreenShot(width, height, async (dataURL: any) => {
      let imageToBase64 = await blobUrlToBase64(dataURL)

      let modelName = window.location.href.split('?')[1].split('=')[1]

      postScreenShot(modelName, imageToBase64)
        .then(res => {
          setImages([...images, imageToBase64])
        })
        .catch(err => {
          console.log(err)
        })
    })
  }
  return (
    <div className='screenshot_container'>
      <Button onClick={triggerScreenShot} className='screenshot_button'>
        Capture d'écran
      </Button>
      <div className='screenshot_img_container'>
        {images.map((image: any, i: number) => {
          return <img src={image} alt='screenshot' key={i} width={200} className='screenshot_img' />
        })}
      </div>
    </div>
  )
}
