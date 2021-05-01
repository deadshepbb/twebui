import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import echarts from 'echarts'
import Moment from 'moment'
import utils from './commen/utils'
import http from './libs/http'

import "./assets/css/reset.scss"
import "./assets/css/common.scss"
import Avue from '@smallwei/avue';
import '@smallwei/avue/lib/index.css';
import "./assets/icon/iconfont.css";
Vue.use(Avue);
Vue.use(ElementUI)

Vue.prototype.$echarts = echarts;
Vue.prototype.$utils = utils;
Vue.prototype.$http = http;
Vue.prototype.$moment = Moment;

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next();
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})


