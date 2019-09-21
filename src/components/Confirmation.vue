<template>
  <div id="confirmation" :class="{ 'hide': !show }">
    <div class="confirmation-body">
      <div class="text-wrapper">
        <div v-if="title" class="title">{{ title }}</div>
        <div class="message">
          <slot>Are you sure?</slot>
        </div>
        <div class="action-buttons">
          <button @click="cancel" class="uk-button uk-button-large button-danger">{{ nText }}</button>
          <button @click="confirm" class="uk-button uk-button-large button-primary">{{ yText }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Are you sure?"
    },
    yText: {
      type: String,
      default: "yes, i'm sure"
    },
    nText: {
      type: String,
      default: "cancel"
    }
  },
  name: "Confirmation",
  data() {
    return {
      show: false
    }
  },
  methods: {
    confirm() {
      this.$emit("confirm");
      this.toggle();
    },

    cancel() {
      this.$emit("cancel");
      this.toggle();
    },

    toggle() {
      this.show = !this.show;
    }
  },
  mounted() {
    window.c = this;
  }
}
</script>

<style scoped>


.hide {
  clip-path: circle(0.0% at 0% 100%) !important;
}

#confirmation {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 9;

  height: 100vh;
  width: 100vw;
  /* text-align: center; */
  background-color: #A22455;
  color: white;

  transition: clip-path 0.5s;
  clip-path: circle(30% at 13% 93%);
}


.confirmation-body {
  position: fixed;
  /* background-color: salmon; */
  bottom: 0;
  left: 0;
  padding: 3em;
  width: 25vw;
  height: 30vh;
}

/* Change to full width if screen is < 1078px wide */
/* Get rid of border and make it shorter */
@media only screen and (max-width: 1078px) {
  #confirmation {
    /* height: 35vh; */
    width: 100vw;
    height: 40vh;
    margin: 0;
    border: 0;
    transition: clip-path 0.7s;
    clip-path: circle(150% at 13% 93%);
  }

  .confirmation-body {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 90%;
    height: 30vh;
    margin: 0;
    padding-right: 3em;
    /* clip-path: circle(150% at 0% 0); */
  }
}

.title {
  font-size: 37px;
  margin-bottom: 0.8em;
}

.action-buttons {
  margin-top: 3em;
}

</style>
