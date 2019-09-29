<template>
  <div>
    <div id="timer">
      <Card :type="'secondary'">
        <div uk-grid>
          <div id="hourglassCell">
            <!-- Full hourglass -->
            <img id="hourglassImage" class="progress" src="@/assets/hourglass.svg" alt="Timer" />
            <!-- Hourglass outline -->
            <img id="hourglassOutlineImage" src="@/assets/hourglass_outline.svg" alt="Timer" />
          </div>
          <div id="inputCell">
            <div class="uk-margin uk-inline">
              <span class="uk-form-icon" uk-icon="icon: clock"></span>
              <input v-model="timerInput" type="text" placeholder="Time" class="uk-input" />
            </div>
            <div class="uk-inline">
              <button @click="start" class="uk-button button-secondary">Start</button>
              <button @click="clear" class="uk-button button-dark">Clear</button>
            </div>
            <!-- <hr class="uk-divider-icon" /> -->
            <h3 class="uk-heading-small">{{ prettyTimeRemaining() }}</h3>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>


<style scoped>
/* Regular */
#hourglassImage {
  height: 200px;
  position: absolute;
  transition: clip-path 1s;
  z-index: 2;
  clip-path: circle(0% at 49.5% 50%);
}

#hourglassOutlineImage {
  height: 200px;
  position: absolute;
}

#hourglassCell {
  width: 145px;
}

#inputCell {
  width: 265px;
  height: 200px;
  display: table;
}

/* Conditionals */
@media only screen and (max-width: 1123px) {
  /* Below 1123px... */
  /* Hide hourglass timer */
  #timer {
    display: none;
  }

  /* Show mobile timer */
  #mobileTimer {
    display: block;
  }
}

</style>


<script>
import Card from '@/components/Card.vue';

export default {
  name: "Timer",

  components: {
    Card
  },

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

      let els;
      let clipPathString;
      progress /= 1.4492753623188406;
      els = document.querySelectorAll(".progress");
      els.forEach(el => {
        if (el.id == 'hourglassImage') {
          clipPathString = "circle(" + progress + "% at 49.5% 50%)";
        } else {
          clipPathString = "circle(" + progress + "% at 0% 50%)";
        }
        el.style.clipPath = clipPathString;
      });


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


