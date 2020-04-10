import axios from 'axios'

import store from '../store/index'
import router from '../router'

// axios.interceptors.request.use(function (config) { // 每次请求时会从localStorage中获取token
//
//   return config
//
// }, function (error) {
//
//   return Promise.reject(error)
// })

// axios.interceptors.response.use(function (response) {
//   console.log(response)
//   if (response.status === 401) {
//     alert('登录已过期，请重新登录。')
//     router.replace({name:'login'})
//   }
//   return response
//
// }, function (error) {
//   console.log('error')
//   console.log(error)
//   if (error == 'Error: Request failed with status code 500' || error == 'Error: Request failed with status code 401') {
//     alert('登录已过期，请重新登录。')
//     store.dispatch('returnlogin',true)
//     router.replace({name:'login'})
//   }
//   return Promise.reject(error)
// })
