import { createRouter, createWebHistory } from 'vue-router'
const Addfollow = () => import('../views/Addfollow.vue')
const Find = () => import('../views/Find.vue')
const My = () => import('../views/My.vue')
const NovelInfo = () => import('../views/NovelInfo.vue')
const Chapter = () => import('../views/Chapter.vue')
const Login = () => import('../views/Login.vue')

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
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
