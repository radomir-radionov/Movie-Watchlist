import axios from 'axios'
import serverApiEndpoints from 'constants/serverApiEndpoints'

const $api = axios.create({
  baseURL: serverApiEndpoints.HOST,
  headers: {
    accept: 'application/json',
  },
})

const httpService = {
  get: $api.get,
  post: $api.post,
  put: $api.put,
  delete: $api.delete,
}

export default httpService
