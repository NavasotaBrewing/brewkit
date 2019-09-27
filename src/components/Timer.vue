<template>
  <div id="timer">

    <div uk-grid>
      <div id="timerCell">
        <!-- Full hourglass -->
        <img id="timerImage" src="@/assets/hourglass.svg" alt="Timer" />

        <!-- Hourglass outline -->
        <img id="outlineImage" src="@/assets/hourglass_outline.svg" alt="Timer" />
      </div>
      <div id="inputCell">
        <div id="inputWrapper">
          <div class="uk-margin">
            <input v-model="timerInput" type="text" placeholder="Time" class="uk-input" />
          </div>
          <button @click="start" class="uk-button button-secondary">Start</button>
          <button @click="clear" class="uk-button button-dark">Clear</button>
          <hr class="uk-divider-icon" />
          <h3 class="uk-heading-small">{{ prettyTimeRemaining() }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
button {
  width: 100%;
}

#timerImage {
  height: 300px;
  position: absolute;
  transition: clip-path 1s;
  z-index: 2;
  clip-path: circle(0% at 49.5% 50%);
}

#timerCell {
  width: 169px;
}

#inputCell {
  width: 265px;
  height: 300px;
  display: table;
}

#inputWrapper {
  display: table-cell;
  vertical-align: middle;
}

#outlineImage {
  height: 300px;
  position: absolute;
}

.full {
  clip-path: circle(100% at 49.5% 50%) !important;
}
</style>


<script>
export default {
  name: "Timer",

  data() {
    return {
      endTime: -1,
      startTime: -1,
      timerInput: "",
    };
  },

  mounted() {
    window.timer = this;

    window.setInterval(() => {
      this.update();
      this.$forceUpdate();
    }, 1000);
  },

  methods: {
    // Right now in seconds
    now() {
      return Math.round(Date.now() / 1000);
    },

    prettyTimeRemaining() {
      let tr = this.timeRemaining();

      if (tr < 0) {
        return "Done.";
      }

      let hours = Math.floor(tr / 3600);
      let minutes = Math.floor((tr / (60)) - (hours*60));
      let seconds = Math.floor(tr - (hours * 3600) - (minutes * 60));

      if (hours < 1 && minutes < 1) { return `${seconds} seconds`}

      let ret = `${seconds}`;
      if (minutes > 0) {
        // if (ret.length == 1) { ret = "0" + ret };
        ret = `${minutes}:` + ret.padStart(2, '0');
      }

      if (hours > 0)  {
        if (ret.length == 4) { ret = "0" + ret; }
        ret = `${hours}:` + ret;
      }
      return ret;
    },

    timeRemaining() {
      return this.endTime - this.now();
    },

    // Update the clip path with the percentage remaining
    update() {
      this.setProgress(this.percentageRemaining() * 100);
    },

    // How far along are we?
    percentageRemaining() {
      if (this.timeRemaining < 0) {
        return 0;
      }
      let elapsedTime = this.now() - this.startTime;
      let totalTime = this.endTime - this.startTime;
      return (elapsedTime / totalTime);
    },

    setProgress(progress) {
      // clip path of 100% is way over
      // Timer is actually filled at 69% (nice)
      // Divide by this, makes 100% == 69

      progress /= 1.4492753623188406;
      let clipPathString = "circle(" + progress + "% at 49.5% 50%)";
      let el = document.getElementById("timerImage");
      el.style.clipPath = clipPathString;
    },

    clear() {
      this.endTime = this.now() - 1;
      this.startTime = this.now() - 1;
      // this.setProgress(100);
      this.setProgress(0);
      // window.setTimeout(() => {
      // }, 1000)
    },

    notify(msg, status = '') {
      this.$parent.notify(msg, status);
    },

    start() {
      let time = this.timerInput.padStart(8, '00:');
      let parts = time.split(":");

      let seconds = parseInt(parts[parts.length - 1]);
      let minutes = parseInt(parts[parts.length - 2]);
      let hours = parseInt(parts[parts.length - 3]);

      if (Number.isNaN(seconds) || Number.isNaN(minutes) || Number.isNaN(hours)) {
        this.notify("Time not valid", 'danger');
        this.timerInput = '';
        return;
      }

      this.timerInput = '';
      this.startTime = this.now();
      this.endTime = this.now() + (hours * 3600) + (minutes * 60) + (seconds);
    }
  }
};
</script>

