import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/LogIn.vue'
import Home from '../components/Home.vue'
import welcome from '../components/welcome.vue'
import Users from '../components/Users.vue'
import Right from '../components/Right.vue'
import Component from '../components/component.vue'
import novel from '../components/novel.vue'
import video from '../components/video.vue'
Vue.use(VueRouter)

//Vue.component('now-time', NowTime)全局组件的写法

const routes = [
  { path: '/login', component: Login },
  {path: '/home', component: Home, redirect: '/welcome',
    // 子路由，不推荐加“/”
    children: [
    {path: '/welcome', component: welcome},
    {path: '/users', component: Users},
    {path: '/right', component: Right},
    {path: '/component', component: Component},
    {path: '/novel', component: novel},
    {path: '/video', component: video}
  ]
  },
]

const router = new VueRouter({
  routes
})
// 路由守卫
router.beforeEach((to, from, next) => {
  // 要访问的路径，从哪个路径来，下一个路径
  if (to.path === '/login') return next()
  const tokenstr = window.sessionStorage.getItem('tokey')
  if (!tokenstr) { return next('/login') }
  next()
})
export default router