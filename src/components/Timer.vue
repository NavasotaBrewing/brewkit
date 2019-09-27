<template>
  <div id="timer">

    <div id="container">
      <img id="timerImage" src="@/assets/hourglass.svg" alt="Timer">
      <img id="outlineImage" src="@/assets/hourglass_outline.svg" alt="Timer">
    </div>

  </div>
</template>


<style scoped>
  #container {
    background-color: salmon;
  }

  #timerImage {
    height: 300px;
    position: absolute;
    transition: clip-path 1s;
    z-index: 2;
    clip-path: circle(0% at 50% 50%)
  }

  #outlineImage {
    height: 300px;
    position: absolute;
  }

  .full {
    clip-path: circle(100% at 50% 50%) !important;
  }
</style>


<script>
export default {
  name: 'Timer',

  mounted() {
    window.timer = this;
  },

  methods: {
    setProgress(progress) {
      let clipPathString = "circle(" + progress + "% at 50% 50%)";
      let el = document.getElementById("timerImage");
      el.style.clipPath = clipPathString;
    }
  }
}
</script>


