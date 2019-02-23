import Vue from 'vue'
import App from './App'
import router from './router'
// Vuikit
import Vuikit from 'vuikit'
import VuikitIcons from '@vuikit/icons'
import '@vuikit/theme'
// Imports
import { Card } from 'vuikit/lib/card'
import { Button } from 'vuikit/lib/button'
import { Navbar } from 'vuikit/lib/navbar'

Vue.use(Vuikit)
Vue.use(VuikitIcons)

// register globally
Vue.component('Card', Card)
Vue.component('Button', Button)
Vue.component('Navbar', Navbar)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
