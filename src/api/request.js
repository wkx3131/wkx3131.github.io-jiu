import axios from 'axios'
const axios1 = axios.create({
 baseURL:'http://localhost:8080/'
})
export default axios1
// 这部分是指定api头