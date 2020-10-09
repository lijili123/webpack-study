/**
 * Created by Ljili on 2020/9/29.
 */
import Vue from 'vue'
import Router from 'vue-router'
import Main from '../layout/main'
import Index from '../pages/Index.vue'
let routes=[
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/main',
    component:Main,
    children:[
      {
        path: '/index',
        component:Index
      }
    ]
  }
]
export default new Router({
  mode:'hash',
  routes
})
Vue.use(Router)