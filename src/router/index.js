import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
import Users from '@/components/home/users.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name:'home',
      path:'/',
      component:Home,
      // user组件路由配置
      children:[
        {
          path:"/users",
          name:'users',
          component:Users
        }
      ]
    }

  ]
})
