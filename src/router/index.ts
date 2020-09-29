import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'create',
    component: () => import('../views/Create.vue')
  },
  {
  path: '/list',
  name: 'list',
  component: () => import('../views/List.vue')
},
{
path: '/note/:id',
name: 'note',
component: () => import('../views/Note.vue')
}

]

const router = new VueRouter({
  routes
})

export default router
