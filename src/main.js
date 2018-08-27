import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router/index'
import fastclick from 'fastclick'
import axios from 'axios'

Vue.prototype.$ajax = axios
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.baseURL = 'http://localhost:3000'

import 'common/stylus/index.styl'

fastclick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
