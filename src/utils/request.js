import axios from 'axios'
import Vue from 'vue'
import store from '@/store'
import { getToken } from '@/utils/auth'

const service = axios.create({
  baseURL: Window.MeConfig.API_URL,
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['Authorization'] = 'Bearer ' + getToken()
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    const status = response.status
    // console.log(response)
    // if the custom code is not 20000, it is judged as an error.
    if (status !== 200) {
      Vue.notify({
        text: res.message || 'Error',
        type: 'error',
      });
      // 401: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 401) {
        // to re-login
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Vue.notify({
      title: 'Notice:',
      text: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
