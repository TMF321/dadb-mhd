import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入 vue-lazyload
import VueLazyload from 'vue-lazyload'

import './assets/styles/base.scss'

Vue.config.productionTip = false

Vue.use(VueLazyload, {
  // 选项配置
  preLoad: 1.3, // 预加载高度，图片在这个配置的高度内的化会自动去加载真实需要的图片地址
  error: require('./assets/logo.png'), // 当加载真实图片出错时，显示的替代图片
  loading: require('./assets/logo.png'), // 加载真实图片地址之前的一个替代图片
  attempt: 1 // 尝试加载真实图片的次数
  // error 与 loading 可以使用线上图片链接，也可以使用本地图片链接，但是要注意，
  // 1. 如果地址是src文件夹中的图片，需要使用 require 去引入
  // 2. 如果地址是public文件夹中的，可以将 public 看成 / 去组织url地址
})

// 全局定义一个过滤器。formatYi
// Vue.filter('formatYi', (value) => {
//   console.log('value: ', value)
//   return `${value}亿`
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
