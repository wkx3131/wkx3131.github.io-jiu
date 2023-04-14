// 封装api接口
import axios1 from './request'
export const aAPI = function(a){//按需导出函数
    return axios1.get('/xx',{params:{a}})
}
// import {aAPI} from '@/api/1.js' 其他页面这样调用，{}是谁就导出谁
// 这就是export，export default的区别

// 到时候，需要的页面就调用这个js,aAPI(a),参数写在页面的data