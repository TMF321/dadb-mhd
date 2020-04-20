import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home'
import Classify from '../views/Classify'
import Hello from '../views/Hello'
import Favorite from '../views/Hello/Favorite'
import History from '../views/Hello/History'
import Login from '../views/Login'
import My from '../views/My'
import Ranking from '../views/Ranking'
import Register from '../views/Register'
import Search from '../views/Search'
import SearchResult from '../views/SearchResult'
import Vip from '../views/Vip'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/home',
      component: Home
    },
    {
      path: '/classify',
      component: Classify
    },
    {
      path: '/hello',
      component: Hello,
      children: [
        {
          path: '/favorite',
          component: Favorite
        },
        {
          path: '/history',
          component: History
        },
        {
          path: '',
          redirect: '/hello/favorite'
        }
      ]
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/my',
      component: My
    },
    {
      path: '/ranking',
      component: Ranking
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/search-result',
      component: SearchResult
    },
    {
      path: '/vip',
      component: Vip
    },
    {
      path: '/',
      redirect: '/home'
    }
  ]
})

export default router
