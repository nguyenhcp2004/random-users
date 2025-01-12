import axios, { AxiosError, AxiosInstance } from 'axios'
import config from '~/constants/config'

export class Http {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: config.baseUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.instance.interceptors.request.use(
      (config) => {
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // Add a response interceptor
    this.instance.interceptors.response.use(
      (response) => {
        return response
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance

export default http
