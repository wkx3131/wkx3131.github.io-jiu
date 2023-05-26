import Vue from 'vue'
import App from './App.vue'
import router from './router'
//import {router} from './router',整体引入和部分引入,@是src的路径
import './plugins/element.js'
// 导入字体图标
import './assets/font/iconfont.css'
//导入全局样式
import './assets/css/global.css'
Vue.config.productionTip = false;
Vue.config.devtools = true;//
//配置axios
import axios from 'axios'
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'text/html; charset=UTF-8';
// axios.defaults.baseURL = "http://localhost:3000/"//基础路由，开头
//请求拦截器
axios.interceptors.request.use(config=>{
  config.headers.Authorization ="123"
  // 没有“密钥”，自己编的
  console.log(config);
  return config
})
Vue.prototype.$http = axios ////添加到原型，起名$http

// import VueLazyload from 'vue-lazyload'
// Vue.use(VueLazyload)







new Vue({
  //el:"#app", 
  router,
  render: h => h(App)//把app.vue渲染到html
}).$mount('#app')//相当于el:"#app"，这个app是指向html的div#app


// 有多个要调用的api这样写，可以各自封装一个对应的js模块，再在main或需要使用的页面导入
// import axios from 'axios'
// const axios1 = axios.create({创建实例
//  baseURL:'http..'
// })
// const axios2 = axios.create({
//  baseURL:'http..'
// })
// export default axios1,axios2 输出，因为没有添加到原型
// 例子放在文件夹API吧

