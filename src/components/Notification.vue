<template>
  <div @click="classes = status" id="notification" :class="classes">
    <!-- Sucess Icon -->
    <span v-if="status == 'success'" uk-icon="icon: check; ratio: 1.5" class="message-icon"></span>
    <!-- Danger Icon -->
    <span v-else-if="status == 'danger'" uk-icon="icon: warning; ratio: 1.5" class="message-icon"></span>
    <!-- Default Icon -->
    <span v-else uk-icon="icon: info; ratio: 1.5" class="message-icon"></span>
    <div class="message-text">
      {{ message }}
    </div>
  </div>
</template>


<style scoped>

  .message-icon {
    float: left;
  }

  .message-text {
    padding-top: 0.2em;
  }

  #notification {
    width: 20vw;
    position: fixed;
    bottom: 0;
    left: 0;

    cursor: pointer;

    margin-bottom: 2em;
    margin-left: 2em;
    padding: 1em;
    padding-left: 0.8em;
    padding-right: 2em;

    border-radius: 300px;
    text-align: center;
    background-color: #EDB271;
    color: white;

    transition: clip-path 0.5s;
    clip-path: circle(0% at 0% 50%);
  }

  .show {
    clip-path: circle(150% at 0% 50%) !important;
  }

  .success {
    background-color: #325F41 !important;
    color: white;
  }

  .danger {
    background-color: #A22455 !important;
    color: white;
  }
</style>


<script>
export default {
  name: 'Notification',
  props: ["message", "status"],
  mounted() {
    this.classes = this.status;

    // This is stupid
    window.setTimeout(() => {
      this.classes += " show"
    }, 1);

    window.setTimeout(() => {
      // Just remove "show" class
      // this.classes = this.status;
    }, 5000);
  },

  data() {
    return { classes: "" }
  },

}
</script>
