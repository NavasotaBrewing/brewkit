<template>
  <div id="app">

    <top-nav-bar class="uk-visible@s" @config="setConfig($event)"></top-nav-bar>
    <!-- <drawer class="uk-hidden@s" @config="setConfig($event)"></drawer> -->

    <vk-notification :timeout="3500" :messages.sync="messages"></vk-notification>

    <!-- routes will be rendered here -->
    <router-view :config="config" />

    <custom-footer :last-update="lastUpdate"></custom-footer>
  </div>
</template>

<script>
// import { clearInterval } from 'timers';
import TopNavBar from '@/components/TopNavBar'
// import Drawer from '@/components/Drawer'
import CustomFooter from '@/components/CustomFooter'
import moment from 'moment'

import socket from '@/socket'
import UIkit from 'uikit'

export default {
  name: 'app',
  components: {
    'top-nav-bar': TopNavBar,
    // drawer: Drawer,
    'custom-footer': CustomFooter
  },
  data () {
    return {
      config: {},
      messages: [],
      updater: '',
      lastUpdate: ''
    }
  },
  mounted() {
    window.app = this
    window.moment = moment
  },
  watch: {
    configSelect: function() {
      let c = {}
      if (this.configSelect != '') {
        c = this.configs.filter(c => c.id == this.configSelect)[0]
      }
      this.setConfig(c)
    }
  },
  methods: {
    async enact() {
      console.log('enact')
      await this.socket.emit('enact', this.config)
      this.update();
    },

    async update() {
      console.log('update')
      this.lastUpdate = moment()
      await this.socket.emit('update', this.config, (config) => {
        this.config = JSON.parse(config);
      })
    },

    registerEnactors() {
      let enactors = document.querySelectorAll('.enactor')
      enactors.forEach((el) => {
        el.addEventListener('click', this.enact);
      });
    },

    startUpdating() {
      this.update();
      this.updater = setInterval(() => {
        this.update();
      }, 3000);
    },

    stopUpdating() {
      if (this.updater) {
        clearInterval(this.updater)
      }
    },

    goLive(config) {
      // Makes update and enact methods work
      // Connect the websocket to the hardware api
      this.socket = socket.connect(this.config.websocket);
      this.startUpdating();
      // Register enact buttons
      this.$nextTick(() => {
        this.registerEnactors();
      });
    },

    die() {
      this.stopUpdating()
      this.config = {}
      this.socket = null
    },

    setConfig(config) {
      if (!config || config == {}) {
        this.die()
      } else {
        // Set the config
        this.config = config
        // Only start updating on the dashboard
        if (this.$router.currentRoute.path == '/') {
          this.goLive(config)
        }
      }
    },

    notify(message) {
      this.messages.push(message);
    }
  }
}
</script>
