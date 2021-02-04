<template>
    <div id="timer">
        <div uk-grid>
            <div id="inputCell">
              <div class="uk-margin uk-inline">
                  <span class="uk-form-icon" uk-icon="icon: clock"></span>
                  <input v-model="timerInput" type="text" placeholder="Time" class="uk-input" />
              </div>
              <br>
              <div class="uk-inline">
                  <button @click="start" class="uk-button button-secondary">Start</button>
                  <button @click="clear" class="uk-button button-dark">Clear</button>
              </div>
              <div class="uk-margin">
                <label uk-tooltip="A Slack message will be sent when the timer finishes">
                  <input v-model="notify" class="uk-checkbox" type="checkbox" checked> Notify when done
                </label>
              </div>
              <hr class="uk-divider-icon" />
              <h3 class="uk-heading-small">{{ prettyTimeRemaining() }}</h3>
            </div>
        </div>
    </div>
</template>


<script>
import Slack from "@/slack.js";

export default {
  name: "Timer",

  data() {
    return {
      endTime: -1,
      startTime: -1,
      timerInput: "",
      notify: false
    };
  },

  mounted() {
    window.timer = this;

    window.setInterval(() => {
      this.update();
      this.$forceUpdate();

      if (this.notify && (this.timeRemaining() < 30 && this.timeRemaining() > 0)) {
        console.log("notify");
        let webhook = this.$root.config.slackWebhook || '';
        Slack.send(webhook, "The timer has " + this.prettyTimeRemaining() + " left");
        this.notify = false;
      }

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


