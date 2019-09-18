<template>
  <div>
    <div id="configSelect" class="uk-card fade uk-card-primary uk-card-body">
      <span id="teaserIcon" uk-icon="icon: server; ratio: 2;"></span>
      <h1 class="uk-title">Configurations</h1>
      <hr />


      <div class="uk-child-width-1-2@s" uk-grid>
        <div class="uk-width-1-5@s">
          <ul class="uk-tab-left" uk-tab>
            <li class="config-list-item" v-for="config in configs" :key="config" :class="{ 'uk-active': selectedConfig == config }" @click="selectedConfig = config">
              <a class="config-list-item-text" href="#">{{ config }}</a>
            </li>
          </ul>
        </div>

        <div>
          <h1>{{ selectedConfig }}</h1>
          Config details go here
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>

.config-list-item-text {
  font-size: 20px !important;
}

#configSelect {
  width: 100vw;
  height: calc(100vh - 80px);
  transition: clip-path 1s;
  background-color: rgb(223, 123, 110);
  /* Lighter color jsut in case */
  /* background-color: rgb(211, 137, 127); */
  clip-path: circle(10% at 100% 0);
}

#configSelect:hover {
  transition: all 1s;
  clip-path: circle(100%);
}

#teaserIcon {
  float: right;
}
</style>


<script>
export default {
  name: "configSelect",
  data() {
    return {
      configs: [
        "March Brewing",
        "October Brewing",
        "Another configuration",
        "Main Configuration"
      ],
      selectedConfig: "March Brewing"
    };
  },
  mounted() {
    window.a = this;
  },
  methods: {
    getAllConfigurations() {
      // To this
    }
  }
};
</script>
