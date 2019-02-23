import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Sandbox from '@/components/Sandbox'
import Configure from '@/components/Configure'
import Procedures from '@/components/Procedures'
import View from '@/components/View'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/configure',
      name: 'Configure',
      component: Configure
    },
    {
      path: '/procedures',
      name: 'Procedures',
      component: Procedures
    },
    {
      path: '/sandbox',
      name: 'Sandbox',
      component: Sandbox
    },
    {
      path: '/view',
      name: 'View',
      component: View
    }
  ]
})

export default router
