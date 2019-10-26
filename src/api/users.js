// 引入axios文件
import axios from '@/utlis/myaxios.js'

//
// 创建api
export const login = (data) => {
  return axios({
    method: 'post',
    url: '/login',
    data
  })
}
