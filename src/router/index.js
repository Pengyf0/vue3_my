import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  // {path:'/',component:resolve => require(['../pages/home/problemList'], resolve)}两种
  {
    path: '/main',
    component: () => import('../views/index.vue'),
    redirect: '/main',
    children: [
      { path: '', component: () => import('../views/types/main.vue') },
      { path: 'book', component: () => import('../views/types/book.vue') },
      { path: 'table', component: () => import('../views/types/table.vue') },
      { path: 'gis', component: () => import('../views/types/gis.vue') },
      { path: 'idea', component: () => import('../views/types/idea.vue') },
      { path: 'myZoom', component: () => import('../views/types/myZoom.vue') },
      { path: 'upload', component: () => import('../views/types/upload.vue') },
    ]
  },
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: () => import('../views/login.vue')
  }
]

const white = ['/login', '/404']
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})


export default router
