import { URL_BASE_SERVER } from 'src/Constants/api'

export const getModelById = async (id: string) => {
  return fetch(URL_BASE_SERVER + `/api/model/${id}`)
    .then(res => res.json())
    .then(data => data)
}

export const postModelData = async (model: any) => {
  return fetch(URL_BASE_SERVER + `/api/model`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(model)
  })
    .then(res => res.json())
    .then(data => data)
}

export const deleteModelById = async (id: any) => {
  return fetch(URL_BASE_SERVER + `/api/model/${id}`, {
    method: 'DELETE'
  })
    .then(res => res.json())
    .then(data => data)
}
