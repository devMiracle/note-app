import Vue from 'vue'
import App from './App'
import router from './router'

//Bootstrap framework
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue);
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

//Font awesome
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import NavBar  from '@/components/NavBar';
import Message  from '@/components/Message';
import API from './constants'

import VueSession from 'vue-session'
Vue.use(VueSession)

// Vue Time Ago 
import VueTimeago from 'vue-timeago'
Vue.use(VueTimeago, {
  name: 'Timeago', 
  locale: 'en',
  locales: {
    'zh-CN': require('date-fns/locale/zh_cn'),
    'ja': require('date-fns/locale/ja'),
  }
})

Vue.component('icon', Icon);
Vue.component('nav-bar',NavBar)
Vue.component('message-alert',Message)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
