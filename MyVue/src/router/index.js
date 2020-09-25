import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import Index from '@/components/Index'
import Jenkins from '@/components/Jenkins'
import Case from '@/components/Case'
import Task from '@/components/Task'
import Report from '@/components/Report'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/signUp',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/index',
      name: 'Index',
      component: Index,
      children:[
        {
            path:'/jenkins',
            name:'Jenkins',
            component:Jenkins
        },
        {
          path:'/task',
          name:'Task',
          component:Task
        },
        {
          path:'/case',
          name:'Case',
          component:Case
        },        
        {
          path:'/report',
          name:'Report',
          component:Report
        }
      ]
    },
  ]
})
