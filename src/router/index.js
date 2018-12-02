import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
import Users from '@/components/user/users.vue'
import Rights from '@/components/right/rights.vue'
import Role from '@/components/right/role.vue'
import Goods from '@/components/goods/goodslist.vue'
import addGoods from '@/components/goods/goodsadd.vue'
import {
  Message
} from 'element-ui'



Vue.use(Router)

var router = new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'home',
      path: '/',
      component: Home,
      // user组件路由配置
      children: [
        {
          path: "/users",
          name: 'users',
          component: Users
        },
        {
          path: '/rights',
          name: 'rights',
          component: Rights
        },
        {
          path: '/roles',
          name: 'roles',
          component: Role
        },
        {
          path: '/goods',
          name: 'goods',
          component: Goods
        },
        {
          path:'/goodsadd',
          name:'goodsadd',
          component:addGoods
        }


      ]
    }

  ]
})

// 导航守卫   在路由配置生效之前
router.beforeEach(function (to, from, next) {
  // to将要去的路由地址
  // from当前路由地址
  // 如果路径是去login的则不需要验证token
  if (to.path == '/login') {
    next()
  } else {
    const token = localStorage.getItem('token')

    if (!token) {
      // token 没有 -> 登录
      Message.warning('请先登录')
      router.push({ name: 'login' })
      return
    }
    next()

  }

})


export default router
