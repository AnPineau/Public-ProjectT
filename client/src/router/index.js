import Vue from 'vue'
import VueRouter from 'vue-router'
import BrowseView from '../views/BrowseView.vue'

import PostCreate from '../components/PostCreateComponent.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'BrowseView',
    component: BrowseView
  },
  {
    path: '/create',
    name: 'CreateView',
    component: () => import(/* webpackChunkName: "create" */ '../views/CreateView.vue')
  },
  {
    path: '/stats/:id',
    name: 'StatsView',
    props: true,
    component: () => import(/* webpackChunkName: "stats" */ '../views/StatsView.vue')
  },
  {
    path: '/play/:id',
    name: 'PlayView',
    props: true,
    component: () => import(/* webpackChunkName: "play" */ '../views/PlayView.vue')
  },
  {
    path: '/admin',
    name: 'AdminView',
    component: () => import(/* webpackChunkName: "admin" */ '../views/AdminView.vue')
  },
  {
    path: '/login',
    name: 'LoginView',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
  }
  ,
  {
    path: '/register',
    name: 'RegisterView',
    component: () => import(/* webpackChunkName: "register" */ '../views/RegisterView.vue')
  },
  {
    path: '/account',
    name: 'AccountView',
    component: () => import(/* webpackChunkName: "account" */ '../views/AccountView.vue')
  },
  {
    path: '/postcreate',
    name: 'PostCreateComponent',
    component: PostCreate
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
