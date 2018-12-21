import Vue from 'vue'
import Router from 'vue-router'

import Main from '@/pages/main'
import Index from '@/pages/index'
import Search from '@/pages/search'
import Car from '@/pages/car'
import Vip from '@/pages/vip'
import Classify from '@/pages/classify'
import FilmDetail from '@/pages/film-detail'
// const Index = () => import ('pages/index')
// const Search = () => import ('pages/search')
// const Car = () => import ('pages/car')
// const Vip = () => import ('pages/vip')


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Main,
      children:[
        {
          path: '',
          redirect: 'index'
        },
        {
          name: 'index',
          path: 'index',
          component: Index
        },
        {
          name: 'search',
          path: 'search',
          component: Search
        },
        {
          name: 'vip',
          path: 'vip',
          component: Vip
        }
      ]
    },
    {
      name: 'car',
      path: '/car',
      component: Car
    },
    {
      name: 'classify',
      path: '/classify/:type',
      component: Classify
    },
    {
      name: 'FilmDetail',
      path: '/film-detail/:id',
      component: FilmDetail
    },
  ]
})
