import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  
  {
    path: '/ItemMusic',
    name: 'itemMusic',
    component: () => import('../views/ItemMusic.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/Search')
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/infoUser',
    name: 'infoUser',
    beforeEnter: (to, from, next) => {
      if (store.state.isLogin || store.state.token ) {
        //|| localStorage.getItem('token')
        next()
      } else {
        next('/Login')
      }
    },
    component: () => import('../views/InfoUser.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from) => {
  if (to.path == '/Login') {
    store.state.isFooterMusic = false
  } else {
    store.state.isFooterMusic = true
  }
})
export default router
