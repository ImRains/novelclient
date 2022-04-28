import axios from 'axios'
import config from './config'

// create an axios instance
const service = axios.create({
  baseURL: config.BASE, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000000, // request timeout
  withCredentials: true
})

// request interceptor
service.interceptors.request.use(
  config => {
    // 对请求头的操作
    // 增添 token
    let token = localStorage.getItem('Authorization_token')
    if(token){
      config.headers.Authorization = token;
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  async response => {
    if (response.data.errno === 0 || response.data.code === '0') {
      //return Promise.reject(new Error(response.data.message || 'Error'))
      if(response.data.data.token){
        // 存入 token
        localStorage.setItem('Authorization_token',response.data.data.token)
      }
      return response
    } else {

    }
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)


export default service
