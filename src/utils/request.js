import axios from 'axios'
import useUserStore from '@/store/modules/user'
import { HttpStatusEnums } from '@/enums'

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 30000
})

const requestBefore = request => {
  const token = useUserStore().getToken()
  if (token) {
    request.headers['Authorization'] = `Bearer ${token}`
  }
  return request
}

const responseBefore = response => {
  const { data } = response
  switch (data.code) {
    case HttpStatusEnums.SUCCESS:
      return Promise.resolve(data)
    case HttpStatusEnums.TOKEN_UNAUTHORIZED:
      useUserStore().logout()
      return Promise.reject(data)
    default:
      ElMessage.error(data.message)
      return Promise.reject(data)
  }
}

const requestError = error => Promise.reject(error)
const responseError = response => Promise.reject(response.response.data)

request.interceptors.request.use(requestBefore, requestError)
request.interceptors.response.use(responseBefore, responseError)

export default request
