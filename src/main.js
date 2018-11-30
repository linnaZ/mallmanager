// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Elementui from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../static/css/reset.css'
import myHttpServer from '@/plugins/http.js'
import moment from "moment"
import Mybread from '@/components/bread/mybread.vue'

Vue.use(Elementui)
Vue.use(myHttpServer)

Vue.config.productionTip = false
// 自定义面包屑全局组件
Vue.component(Mybread.name,Mybread)
// 设置日期格式的过滤器
Vue.filter('fmtData',(v)=>{
  return moment(v).format('YYYY-MM-DD')
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
