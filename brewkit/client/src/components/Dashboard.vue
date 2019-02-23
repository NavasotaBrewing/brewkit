<template>
  <div id="dashboard">
    <!-- Tool Section -->
    <div class="uk-section">
      <div class="uk-container">
        <vk-grid class="uk-child-width-1-2@s" divided>
          <div>
            <timer/>
          </div>
          <div>
            <slack :webhook="config.slackWebhook" :channel="config.slackChannel"/>
          </div>
        </vk-grid>
      </div>
    </div>

    <!-- Devices Section -->
    <div v-if="config.devices">
      <div class="uk-section uk-section-muted">
        <div class="uk-container">
          <device-summary :devices="config.devices" :include-thermos="false" :editable="true"></device-summary>
        </div>
      </div>

      <!-- Thermostats Section -->
      <div class="uk-section">
        <div class="uk-container">
          <mobile-thermo-chart class="uk-hidden-notouch" v-for="thermo in thermos" :key="thermo.id" :thermo="thermo"></mobile-thermo-chart>
          <vk-tabs class="uk-hidden-touch" align="left">
            <vk-tabs-item v-for="thermo in thermos" :key="thermo.id" :title="thermo.name">
              <thermo-chart :thermo="thermo"></thermo-chart>
            </vk-tabs-item>
          </vk-tabs>
        </div>
      </div>
    </div>

    <div v-else class="uk-section uk-section-muted uk-text-center">
      <p class="uk-text-lead">Select a configuration to get started</p>
      <p>Or <a href="/configure">create one</a> if you haven't already</p>
    </div>
  </div>
</template>

<style>

</style>

<script>
import Timer from "@/components/Timer";
import Slack from "@/components/Slack";
import DeviceSummary from "@/components/DeviceSummary";
import ThermoChart from "@/components/ThermoChart";
import MobileThermoChart from "@/components/MobileThermoChart";

import $ from "jquery";
export default {
  name: "dashboard",
  props: ["config"],
  components: {
    timer: Timer,
    slack: Slack,
    "device-summary": DeviceSummary,
    "thermo-chart": ThermoChart,
    'mobile-thermo-chart': MobileThermoChart
  },
  data: function() {
    return {};
  },
  computed: {
    thermos: function() {
      if (!this.config.devices) {
        return [];
      }
      return this.config.devices.filter(d => d.type == "thermostat");
    }
  }
};
</script>
