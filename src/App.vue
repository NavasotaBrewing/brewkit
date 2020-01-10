<template>
  <div id="app">

    <Notification
      v-for="n in notifications"
      :key="n.id"
      :message="n.message"
      :status="n.status"
      :ref="'notification' + n.id"
    />

    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Notification from "@/components/Notification.vue";

import UIkit from "uikit";
window.UIkit = UIkit;
// import api from '@/api';

export default {
  data() {
    return {
      notifications: []
    };
  },
  components: {
    Navbar,
    Notification
  },
  mounted() {
    window.app = this;
  },

  methods: {
    notify(message, status = "") {
      let id = Math.floor(Math.random() * 100000000);
      this.notifications.push({
        message: message,
        status: status,
        id: id
      });
    },
  }
};
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

:root {
  /* Primary */
  --color-primary: #69BF8A;
  --color-primary-dark: rgb(88, 160, 116);


  /* Secondary */
  --color-secondary: #1C5D99;
  --color-secondary-dark: rgb(26, 80, 131);

  /* Tertiary */
  --color-tertiary: #F4C095;
  --color-tertiary-dark: rgb(224, 176, 136);

  /* Dark */
  --color-dark: #071E22;
  --color-dark-darker: rgb(5, 21, 24);

  /* Danger */
  --color-danger: #EE2E31;
  --color-danger-dark: rgb(214, 46, 49);
}


.button-primary {
  background-color: var(--color-primary) !important;
  color: white !important;
}
.button-primary:hover {
  background-color: var(--color-primary-dark) !important;
}

.label-primary {
  background-color: var(--color-primary) !important;
}

.button-secondary {
  background-color: var(--color-secondary) !important;
  color: white !important;
}
.button-secondary:hover {
  background-color: var(--color-secondary-dark) !important;
}

.button-tertiary {
  background-color: var(--color-tertiary) !important;
  color: white !important;
}

.button-tertiary:hover {
  background-color: var(--color-tertiary-dark) !important;
}


.button-danger {
  background-color: var(--color-danger) !important;
  color: white !important;
}

.button-danger:hover {
  background-color: var(--color-danger-dark) !important;
}

.label-danger {
  background-color: var(--color-danger) !important;
}

.button-dark {
  background-color: var(--color-dark) !important;
  color: white !important;
}

.button-dark:hover {
  background-color: var(--color-dark-darker) !important;
}

.button-margin {
  margin-right: 0.5em !important;
}

button:disabled {
  opacity: 0.6;
}

.uk-section-muted .uk-card {
  background-color: #f8f8f8 !important;
}

.cursor {
  cursor: pointer;
}

.uk-subnav-pill > .uk-active > a {
  background-color: var(--color-secondary) !important;
}

</style>
