import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'uikit/dist/css/uikit.css';
import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons';

UIkit.use(Icons);

require("uikit");

Vue.config.productionTip = false

import api from '@/api.js';

new Vue({
  router,
  data() {
    return {
      config: {}
    }
  },
  async mounted() {
    // This is just for dev
    // Gets the first config in the db and sets it as active
    this.config = (await api.getConfigurations())[0];
  },
  render: h => h(App)
}).$mount('#app')
