<template>
  <div :class="classes[type]" class="uk-card">
    <div class="uk-card-body dark-text">
      <div class="uk-card-title dark-text">{{ title }}</div>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.card-primary {
  background-color: white;
  border-left: 0.6em solid #EDB271;
  color: none;
}

.card-secondary {
  background-color: white;
  border-left: 0.6em solid rgb(64, 136, 88);
  color: none;
}

.card-tertiary {
  background-color: white;
  border-left: 0.6em solid rgb(236, 113, 97);
  color: none;
}

.card-danger {
  background-color: white;
  border-left: 0.6em solid #A22455;
  color: none;
}

.dark-text {
  color: rgb(75, 74, 74) !important;
}
</style>

<script>
export default {
  name: "Card",
  props: {
    title: {
      type: String,
      required: false
    },
    type: {
      type: String,
      default: 'default'
    }
  },
  data() {
    return {
      classes: {
        primary: 'card-primary',
        secondary: 'card-secondary',
        tertiary: 'card-tertiary',
        danger: 'card-danger',
        default: 'card-default'
      }
    }
  },
}
</script>
