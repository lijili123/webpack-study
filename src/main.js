/**
 * Created by Ljili on 2020/9/22.
 */

import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import './assets/css/index.css'
import './assets/css/base.less'
Vue.use(ElementUI)
import router from './router'
new Vue({
  router,
  render:h=>h(App)
}).$mount('#app')