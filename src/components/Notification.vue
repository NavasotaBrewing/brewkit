<template>
  <div @click="classes = status" id="notification" :class="classes">
    <div class="message-text">
      {{ message }}
    </div>
  </div>
</template>


<style scoped>
  #notification {
    width: 20vw;
    position: fixed;
    bottom: 0;
    left: 0;

    cursor: pointer;

    margin-bottom: 2em;
    margin-left: 2em;
    padding: 1em;
    padding-left: 2em;
    padding-right: 2em;

    border-radius: 300px;
    text-align: center;
    background-color: #D5D6CE;

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
      this.classes = this.status;
    }, 5000);
  },

  data() {
    return {
      classes: "",
    }
  },

}
</script>
