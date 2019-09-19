<template>
  <div id="confirmation" :class="{ 'hide': !show }">
    <div class="confirmation-body">
      <div v-if="title" class="title">{{ title }}</div>
      <div v-if="message" class="message">
        {{ message}}
      </div>
      <div class="action-buttons">
        <button @click="cancel" class="uk-button uk-button-large cancel-button">{{ nText }}</button>
        <button @click="confirm" class="uk-button uk-button-large confirm-button">{{ yText }}</button>
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
    message: {
      type: String,
      required: false
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
      console.log("toggling")
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

  /* height: 45vh; */
  width: 30vw;
  background-color: #A22455;
  text-align: center;

  border-top-right-radius: 30px;
  color: white;

  transition: clip-path 0.5s;
  clip-path: circle(150% at 100% 100%)
}


/* Change to full width if screen is < 900px wide */
/* Get rid of border and make it shorter */
@media only screen and (max-width: 1024px) {
  #confirmation {
    /* height: 35vh; */
    width: 100%;
    border-radius: 0;
  }
}

.confirmation-body {
  padding: 3em;
}

.title {
  font-size: 37px;
  margin-bottom: 0.8em;
}

.action-buttons {
  margin-top: 3em;
}

.confirm-button {
  background-color: #EDB271;
}

.cancel-button {
  background-color: #A22455;
}

</style>
