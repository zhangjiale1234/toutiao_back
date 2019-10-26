// 引入axios文件
import axios from '@/utlis/myaxios.js'

export const postsList = (params) => {
  return axios({
    url: '/post',
    params
  })
}
// 新增文章
export const addPosts = () => {
  return axios({
    url: '/post',
    method: 'post'
  })
}
// 栏目
export const getCategory = () => {
  return axios({
    url: '/category'
  })
}
// 发布文章

export const sendPosts = (data) => {
  return axios({
    method: 'post',
    url: '/post',
    data
  })
}
