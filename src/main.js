import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'uikit/dist/css/uikit.css';
// import UIkit from 'uikit'
import 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';

UIkit.use(Icons);

require("uikit");

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
