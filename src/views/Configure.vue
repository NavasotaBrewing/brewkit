<template>
  <div>
    <!-- Create config confirmation (hidden) -->
    <Confirmation
      @confirm="createConfig"
      :title="'Create a Configuration'"
      :yText="'Create'"
      ref="createConfigConfirmation">
      <div class="uk-inline">
        <input
          type="text"
          v-model="newConfigName"
          :class="{ 'uk-form-danger': !configNameUnique }"
          placeholder="Name"
          class="uk-input"
        />
      </div>
    </Confirmation>

    <!-- Create config confirmation show button -->
    <button
      @click="showCreateConfigConfirmation"
      id="createConfigButton"
      class="uk-button uk-button-large button-primary">Create
    </button>

    <!-- Config select and details -->
    <div class="uk-container">
      <div uk-grid>


        <!-- Select config -->
        <div class="uk-width-1-3@m">
          <!-- Select config card -->
          <Card
            id="selectConfigCard"
            class="uk-margin-top"
            :type="'primary'"
            :title="'Select a Configuration'"
          >
            <!-- Select config -->
            <div class="uk-margin">
              <select id="configSelect" v-model="configSelect" class="uk-select">
                <option value="-1" disabled>-- Select a Configuration --</option>
                <option v-for="c in configs" :key="c.id" :value="c.id">{{ c.name }}</option>
              </select>
            </div>

            <!-- Save button -->
            <div class="uk-margin">
              <button
                @click="updateConfig"
                v-show="config.id != undefined"
                class="uk-button button-margin button-primary"
              >Save</button>
            </div>
          </Card>
        </div>

        <!-- Config details -->
        <div v-if="config.id" class="uk-width-2-3@s">
          <Card id="configDetailsCard" class="uk-margin-top">
            <!-- Name -->
            <div class="uk-margin">
              <!-- <label for="configNameInput" class="uk-text-uppercase uk-text-lead">Name</label> -->
              <input
                type="text"
                id="configNameInput"
                placeholder="Configuration Name"
                v-model="config.name"
                class="uk-input"
              />
            </div>
            <!-- Description -->
            <div class="uk-margin">
              <textarea
                placeholder="Description"
                v-model="config.description"
                id="configDescInput"
                cols="20"
                rows="3"
                class="uk-textarea"
              ></textarea>
            </div>
            <!-- <hr> -->
            <!-- Slack -->
            <div uk-grid>
              <div class="uk-width-2-3@s">
                <div class="uk-inline uk-width-1-1">
                  <a
                    class="uk-form-icon uk-form-icon-flip"
                    uk-tooltip="You can register a webhook on your slack channel's page. This is optional."
                    uk-icon="info"
                  />
                  <code>
                    <input
                      class="uk-input"
                      v-model="config.slackWebhook"
                      type="text"
                      placeholder="Slack Webhook"
                    />
                  </code>
                </div>
              </div>
              <div class="uk-width-1-3@s">
                <div class="uk-inline">
                  <a
                    class="uk-form-icon uk-form-icon-flip"
                    uk-tooltip="For display purposes only"
                    uk-icon="icon: info"
                  ></a>
                  <code>
                    <input
                      class="uk-input"
                      v-model="config.slackChannel"
                      type="text"
                      placeholder="Slack Channel"
                    />
                  </code>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>


    <!-- RTU section -->
    <div class="uk-section-muted uk-margin-top">
      <div class="uk-container">
        <div uk-grid>

          <!-- Add RTU card -->
          <div class="uk-width-1-3@m uk-margin-top uk-margin-bottom">
            <Card :type="'secondary'" :title="'New RTU'">
              <div class="uk-margin">
                <label for="driverSelect">Type</label>
                <select id="driverSelect" class="uk-select">
                  <option value="STR1">STR1</option>
                  <option value="Omega">Omega</option>
                </select>
              </div>
            </Card>
          </div>
          <div class="uk-width-2-3@m">
            All RTUs list
            <br />
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem velit incidunt inventore quod amet, error consectetur, mollitia ad laboriosam rerum sit architecto? Natus enim odit animi doloremque provident corporis a.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api";

import Card from "@/components/Card.vue";
import Confirmation from "@/components/Confirmation.vue";

export default {
  name: "Configure",
  components: {
    Card,
    Confirmation
  },
  data() {
    return {
      config: {},
      configs: [],
      newConfigName: "",
      configSelect: -1
    };
  },
  computed: {
    configNameUnique() {
      let foundConfig = this.configs.filter(
        c => c.name == this.newConfigName
      )[0];
      return foundConfig == undefined;
    }
  },
  mounted() {
    this.captureSave();

    window.configure = this;
    this.refreshConfigs();
  },
  methods: {
    captureSave() {
      document.addEventListener(
        "keydown",
        e => {
          if (
            (window.navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey) &&
            e.keyCode == 83
          ) {
            e.preventDefault();
            this.updateConfig();
          }
        },
        false
      );
    },

    async refreshConfigs() {
      this.configs = await api.getConfigurations();
    },

    selectConfig(id) {
      let config = this.configs.filter(c => c.id == id)[0];
      this.config = config;
    },

    showCreateConfigConfirmation() {
      this.$refs.createConfigConfirmation.toggle();
    },

    notify(message, status = "") {
      this.$parent.notify(message, status);
    },

    createConfig() {
      let foundConfig = this.configs.filter(
        c => c.name == this.newConfigName
      )[0];
      if (foundConfig != undefined || this.newConfigName.length < 1) {
        this.notify("Name not valid, pick another", "danger");
        return;
      }

      api
        .createConfiguration({ name: this.newConfigName })
        .then(result => {
          this.refreshConfigs();
          console.log(this.configs);
          this.newConfigName = "";
          this.notify("Configuration created", "success");
        })
        .catch(e => {
          this.notify(
            "Something went wrong, configuration could not be created",
            "danger"
          );
          console.log(e);
        });
    },

    updateConfig() {
      if (this.config.id == undefined) {
        this.notify("Select a configuration to update", "danger");
        return;
      }

      api
        .updateConfiguration(this.config.id, this.config)
        .then(result => {
          this.notify("Updated", "success");
        })
        .catch(e => {
          this.notify(
            "Something went wrong, could not update configuration",
            "danger"
          );
        });
    }
  },
  watch: {
    configSelect: function() {
      this.selectConfig(this.configSelect);
    }
  }
};
</script>


<style scoped>
/* #selectConfigCard {
  margin-top: 2em;
} */

#selectConfigCard * {
  color: black;
}

#createConfigButton {
  position: fixed;
  bottom: 2.3em;
  left: 4em;
}
</style>
