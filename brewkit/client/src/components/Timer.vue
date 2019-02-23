<template>
  <div id="timer">
    <h1 v-show="done" class="uk-heading-primary">Done</h1>
    <vk-grid v-show="!done" id="timerCountdown" class="uk-grid-small uk-child-width-auto">
      <!-- Hours -->
      <div>
        <div class="uk-countdown-number uk-heading-primary uk-countdown-hours"></div>
        <div class="uk-countdown-label uk-margin-small uk-text-center uk-visible@s">Hours</div>
      </div>
      <div class="uk-countdown-separator uk-heading-primary">:</div>
      <!-- Minutes -->
      <div>
        <div class="uk-countdown-number uk-heading-primary uk-countdown-minutes"></div>
        <div class="uk-countdown-label uk-margin-small uk-text-center uk-visible@s">Minutes</div>
      </div>
      <div class="uk-countdown-separator uk-heading-primary">:</div>
      <!-- Seconds -->
      <div>
        <div class="uk-countdown-number uk-heading-primary uk-countdown-seconds"></div>
        <div class="uk-countdown-label uk-margin-small uk-text-center uk-visible@s">Seconds</div>
      </div>
    </vk-grid>
    <div class="uk-margin uk-align-left">
      <div class="uk-margin">
        <input
          @keydown.enter="startTimer"
          v-model="timerInput"
          class="uk-input"
          type="text"
          placeholder="Duration"
        >
      </div>
      <button @click="startTimer" class="uk-button uk-button-primary">Start</button>
      <div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
        <label>
          <input v-model="sendWhenDone" class="uk-checkbox" type="checkbox" checked> Send slack message when done
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import UIkit from 'uikit'
window.uikit = UIkit
export default {
  name: "timer",
  props: [],
  data: function() {
    return {
      sendWhenDone: false,
      timerInput: "",
      timer: null
    };
  },
  computed: {
    done: function() {
      if (!this.timer || this.timer.date <= moment().unix() * 1000) {
        return true;
      }
      return false
    }
  },
  methods: {
    prepInput() {
      if (this.timerInput[0] == ':') {
        this.timerInput = '00' + this.timerInput
      } else if (this.timerInput[this.timerInput.length - 1] == ':') {
        this.timerInput = this.timerInput + '00'
      }

      if (this.timerInput == "") {
        return "00:00:00";
      }

      if (this.timerInput.length <= 2) {
        return "00:" + this.timerInput + ":00";
      }

      if (this.timerInput.length <= 5) {
        return "00:" + this.timerInput;
      }

      return this.timerInput;
    },

    startTimer() {
      let input = this.prepInput();
      let date = this.inputToISO(input);
      console.log(date);
      this.timer = UIkit.countdown(document.getElementById('timerCountdown'), { date: date });
      console.log(this.timer);
      this.timer.start();
      this.timerInput = "";
      this.timerWatcher = setInterval(() => {
        if (moment().unix() * 1000 >= this.timer.date) {
          if (this.sendWhenDone) {
            this.$emit('send-slack-message')
          }
          clearInterval(this.timerWatcher);
        }
      }, 5000);
    },

    inputToISO(str) {
      // Takes an input like 02:34:31 and converts it to an ISO 8601 date with that time added to the current time
      let times = str.split(":");

      let hours = parseInt(times[0]);
      let minutes = parseInt(times[1]);
      let seconds = parseInt(times[2]);

      let now = moment().unix();
      now += seconds;
      now += minutes * 60;
      now += hours * 3600;

      let iso = moment(now * 1000).format();
      return iso;
    }
  }
};
</script>
