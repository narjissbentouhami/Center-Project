import axios from 'axios'
import { URL_BASE_SERVER } from 'src/Constants/api'

export const getScreenShots = async (modelName: string) => {
  return axios
    .get(`${URL_BASE_SERVER}screenshot/${modelName}`)
    .then(response => {
      let images: string[] = []
      response.data.data.forEach((element: any) => {
        images.push(element.image)
      })
      return images
    })
    .catch(error => {
      console.log(error)
    })
}

export const postScreenShot = async (modelName: string, image: string) => {
  return axios
    .post(`${URL_BASE_SERVER}screenshot/${modelName}`, {
      image: image
    })
    .then(response => {
      return response.data
    })
    .catch(error => {
      console.log(error)
    })
}
