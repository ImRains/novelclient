import { createRouter, createWebHistory } from 'vue-router'
import vuex from '../store/inedx'
const Addfollow = () => import('../views/Addfollow.vue')
const Find = () => import('../views/Find.vue')
const My = () => import('../views/My.vue')
const NovelInfo = () => import('../views/NovelInfo.vue')
const Chapter = () => import('../views/Chapter.vue')
const Login = () => import('../views/Login.vue')
const Signup = () => import('../views/Signup.vue')
const Error404 = () => import('../views/Error.vue')
const Setting = () => import('../views/Setting.vue')

const routes = [
  {
    path: '/addfollow',
    name: 'Addfollow',
    component: Addfollow
  },
  {
    path: '/',
    name: 'Find',
    component: Find
  },
  {
    path: '/my',
    name: 'My',
    component: My
  },
  {
    path: '/novelinfo',
    name: 'NovelInfo',
    component: NovelInfo
  },
  {
    path: '/chapter/:bookid/:chapterindex',
    name: 'Chapter',
    component: Chapter
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/404',
    name:'404',
    component: Error404
  },
  {
    path: '/setting',
    name: 'Setting',
    component: Setting
  },
  {
    path: "/:pathMath(.*)", // 此处需特别注意置于最底部
    redirect: "/404"
  }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

/**
 * Vue导航守卫
 */
router.beforeEach((to,from,next) => {
  let a = vuex.state.user
  console.log(a)
  console.log('vuex',a.userInfo)
  if (to.path === '/login' || to.path === '/signup') {
    next();
  } else {
    let token = localStorage.getItem('Authorization_token');

    if (token === null || token === '') {
      next({
        path:'/login',
        query:{
          backUrl : encodeURIComponent(to.fullPath)
        }
      });
    } else {
      next();
    }
  }
})

export default router
