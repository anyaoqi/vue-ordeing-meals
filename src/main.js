import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import store from './store'
import 'assets/lib/bootstrap/css/bootstrap.min.css'  
import 'assets/lib/bootstrap/js/bootstrap.min'  
import 'swiper.css';
import 'assets/font/iconfont/iconfont.css';
import 'assets/font/iconfont2/iconfont.css';

import layer from 'vue-layer'
Vue.prototype.$layer = layer(Vue);

// Vue.use(axios)
Vue.prototype.$axios = axios;

export default new Vue({
  el: '#app',
  store, // 使用store
  render: h => h(App)
})
