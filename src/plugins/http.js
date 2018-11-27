import axios from 'axios'
const myHttpServer={}
myHttpServer.install = function (Vue) {
//  这是基准地址
axios.defaults.baseURL='http://localhost:8888/api/private/v1/'
  // 4. 添加实例方法
  Vue.prototype.$http = axios
}

// 暴露接口
export default myHttpServer