// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper);

// ajax请求
import axios from 'axios'
Vue.prototype.$ajax = axios;

if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'api/movie'
} else {
  axios.defaults.baseURL = 'https://api.douban.com/v2/movie'
}

/*图片懒加载*/
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: require('@/assets/img/logo.png'),
  attempt: 1
})

// 在main.js中引入vuex并挂载到Vue实例上
import {store} from './store/index.js'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
