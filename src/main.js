import Vue from 'vue'
import App from './App'
import router from './router'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import './assets/css/custom.css'

import GoogleMap from './components/GoogleMap.vue'


Vue.use(Vuetify, {
  theme:{
    primery: '#78c3ff',
    info: '#f15c4f'
  }
})

Vue.config.productionTip = false

Vue.component('google-map', GoogleMap)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
