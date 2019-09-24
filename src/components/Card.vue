<template>
  <div :class="classes[type]" class="uk-card rounded-corners shadow">
    <div class="uk-card-body dark-text">
      <div class="uk-card-title dark-text">{{ title }}</div>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>

.rounded-corners {
  border-radius: 7px;
}

.shadow {
  -webkit-box-shadow: 0px 0px 10px 0px rgba(173,173,173,0.36);
  -moz-box-shadow: 0px 0px 10px 0px rgba(173,173,173,0.36);
  box-shadow: 0px 0px 10px 0px rgba(173,173,173,0.36);
}

.card-primary {
  background-color: white;
  border: 0.2em solid var(--color-primary);
  color: none;
}

.card-secondary {
  background-color: white;
  border: 0.2em solid var(--color-secondary);
  color: none;
}

.card-tertiary {
  background-color: white;
  border: 0.2em solid var(--color-tertiary);
  color: none;
}

.card-danger {
  background-color: white;
  border: 0.2em solid var(--color-danger);
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
