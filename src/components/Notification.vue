<template>
  <div @click="close" id="notification" :class="classes" uk-grid>
    <!-- Sucess Icon -->
    <span v-if="status == 'success'" uk-icon="icon: check; ratio: 1.5" class="uk-float-left message-icon"></span>
    <!-- Danger Icon -->
    <span v-else-if="status == 'danger'" uk-icon="icon: warning; ratio: 1.5" class="uk-float-left message-icon"></span>
    <!-- Default Icon -->
    <span v-else uk-icon="icon: info; ratio: 1.5" class="uk-float-left message-icon"></span>
    <div class="message-text">
      {{ message }}
    </div>
  </div>
</template>


<style scoped>

  .message-icon {
    position: absolute;
    left: 5%;
    top: 25%;
  }

  .message-text {
    padding-top: 0.2em;
    margin-left: 2.5em;
  }

  #notification {
    width: 400px;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 10;

    cursor: pointer;

    margin-bottom: 2em;
    margin-left: 2em;
    padding: 1em;
    padding-left: 0.8em;
    padding-right: 2em;

    border-radius: 300px;
    text-align: center;
    background-color: var(--color-dark);
    color: white;

    transition: clip-path 0.5s;
    clip-path: circle(0% at 50% 50%);
  }

  @media only screen and (max-width: 510px) {
    #notification {
      width: -webkit-fill-available;
      position: fixed;
      bottom: 0;
      left: 0;

      margin: 0;
      padding: 2em;
      border-radius: 0;
    }

    .message-icon {
      top: 35%;
    }
  }

  .show {
    clip-path: circle(100% at 50% 50%) !important;
  }

  .success {
    background-color: var(--color-primary) !important;
    color: white;
  }

  .danger {
    background-color: var(--color-danger) !important;
    color: white;
  }
</style>


<script>
export default {
  name: 'Notification',
  props: ["message", "status", "callback"],
  mounted() {
    this.classes = this.status;

    // This is stupid
    window.setTimeout(() => {
      this.classes += " show"
    }, 1);

    window.setTimeout(() => {
      this.close();
    }, 4000);
  },

  methods: {
    close() {
      // Just remove "show" class
      this.classes = this.classes.replace(/show/g, '');
    }
  },

  data() {
    return { classes: "" }
  },

}
</script>
