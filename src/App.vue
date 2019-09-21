<template>
  <div id="app">
    <Notification v-for="n in notifications" :key="n.id" :message="n.message" :status="n.status" :ref="'notification' + n.id" />
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Notification from '@/components/Notification.vue';

import UIkit from 'uikit';
window.UIkit = UIkit;
import api from '@/api';

export default {
  data() {
    return {
      notifications: [],
    }
  },
  components: {
    Navbar,
    Notification
  },
  mounted() {
    window.app = this
  },

  methods: {
    notify(message, status="") {
      let id = Math.floor(Math.random() * 100000000);
      this.notifications.push({
        message: message,
        status: status,
        id: id
      });
    }
  },
}
</script>


<style>
/*
Colors
 - #EDB271 - Burly wood - Primary
 - #83315E - Eggplant
 - #A85B60 - Violet red
 - #A22455 - Rich purple

 - #325F41 - Muted Green
 - #D5D6CE - Creamish
 - #582329 - Dark - slight purple
 - #C56B39 - light tan

 - Almost black (text) - rgb(63, 63, 63)
*/
/* Global styles */
/* ------------- */



/* Form */

/* Buttons */

.button-primary {
  background-color: #EDB271 !important;
  color: white !important;
}
.button-primary:hover {
  background-color: rgb(212, 158, 100) !important;
}

.button-danger {
  background-color: #A22455 !important;
  color: white !important;
}
.button-danger:hover {
  background-color: rgb(129, 31, 68) !important;
}

.button-secondary {
  background-color: rgb(69, 160, 100) !important;
  color: white !important;
}
.button-secondary:hover {
  background-color: rgb(65, 148, 92) !important;
}

.button-margin {
  margin-right: 0.5em !important;
}

.button-primary:disabled {
  background-color: rgba(212, 158, 100, 0.6) !important;
}

.uk-section-muted .uk-card {
  background-color: #F8F8F8 !important;
}

</style>
