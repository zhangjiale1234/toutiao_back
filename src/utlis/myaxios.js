// 引入
import axios from 'axios'
// 设置基准路径
axios.defaults.baseURL = 'http://127.0.0.1:3000'
// 暴露
export default axios
// 添加请求拦截
// axios.interceptors.request.use(function (config) {
//   // 在发送请求之前做些什么
//   let token = localStorage.getItem('successLogin_back')
//   // 如果有token值就把headers添加一个Authorization属性
//   if (token) {
//     config.headers.Authorization = token
//   }
//   return config
// }, function (error) {
//   // 对请求错误做些什么
//   return Promise.reject(error)
// })
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  let token = localStorage.getItem('successLogin_back')
  if (token) {
    config.headers.Authorization = token
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加相应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
//   response===res
  return response
}, function (error) {
  // 对响应错误做点什么
  console.log(error)
  return Promise.reject(error)
})
