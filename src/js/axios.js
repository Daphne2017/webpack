import axios from 'axios'
export function getProductTree() {
  // 用axios.get()请求资源
  return axios.get('/api/a/1190000018704305')
}