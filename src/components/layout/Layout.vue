<template>
  <div id="layout">
    <!-- Layout management buttons -->
    <div v-if="!locked" class="uk-margin">
      <!-- Save Layout -->
      <button @click="saveLayout()" class="uk-button button-primary">
        Save Layout
      </button>
      <!-- Name input -->
      <input
        v-model="layout.name"
        type="text"
        class="uk-input uk-form-width-medium button-margin"
        placeholder="Layout Name"
      />
      <!-- This component contains the button and modal to load a layout -->
      <LoadLayout @loadedLayout="loadLayout($event)"></LoadLayout>
      <!-- Lock -->
      <button
        @click="lock(true)"
        class="uk-button button-margin button-secondary"
      >
        Lock
      </button>
      <button @click="resetLayout()" class="uk-button button-margin">
        Reset
      </button>
      <!-- Delete -->
      <button
        v-if="layout.id != null"
        @click="deleteLayout()"
        class="uk-button button-margin button-danger uk-float-right"
      >
        Delete Layout
      </button>
    </div>
    <div v-else class="uk-margin">
      <button
        @click="lock(false)"
        class="uk-button button-margin button-secondary"
      >
        Unlock
      </button>
    </div>

    <!-- Layout grid -->
    <ul
      class="uk-grid-small"
      uk-sortable="handle: .uk-card"
      uk-grid="masonry: false"
    >
      <ModuleSlot
        v-for="mdl in layout.modules"
        :key="mdl.id"
        :id="mdl.id"
        :ref="mdl.id"
        :width="mdl.width"
        :content="mdl.content"
        :class="{ 'uk-sortable-nodrag': locked }"
        @remove="removeModule($event)"
        @activate="activateModule($event[0], $event[1])"
        @new-width="mdl.width = $event"
      />

      <!-- As long as it's not locked, clicking this one will add a new blank module -->
      <ModuleSlot
        v-if="!locked"
        :id="0"
        :width="'1/3'"
        @add="addModule()"
        :content="{ driver: 'add' }"
      ></ModuleSlot>
    </ul>
  </div>
</template>

<style>
#layout {
  padding: 10px;
}
</style>

<script>
import ModuleSlot from "@/components/layout/ModuleSlot.vue";
import LoadLayout from "@/components/layout/LoadLayout.vue";

import api from "@/api.js";

export default {
  name: "home",
  components: {
    ModuleSlot,
    LoadLayout,
  },

  data: function () {
    return {
      layout: {
        id: null,
        name: "",
        modules: [
          { id: 1, width: "1/3", content: { driver: "none" } },
          // {id: 2, width: "1/4", content: {driver: "none"}},
          // {id: 3, width: "1/4", content: {driver: "none"}},
          // {id: 4, width: "1/4", content: {driver: "none"}},
          // {id: 5, width: "1/4", content: {driver: "none"}},
          // {id: 6, width: "1/2", content: {driver: "none"}},
          // {id: 7, width: "1/3", content: {driver: "none"}},
          // {id: 8, width: "1/3", content: {driver: "none"}},
          // {id: 9, width: "1/3", content: {driver: "none"}},
        ],
      },
      // Prevents the layout from being changed.
      locked: false,
    };
  },

  methods: {
    loadLayout(layout) {
      this.layout = layout;
      this.registerEnactors();
    },

    registerEnactors() {
      setTimeout(() => {
        console.log("registering");
        let enactors = document.querySelectorAll(".enactor");
        enactors.forEach((en) => {
          en.addEventListener("click", () => {
            this.$root.writeWaiting = true;
          });
        });
      }, 10);
    },

    removeModule(id) {
      this.layout.modules = this.layout.modules.filter((mdl) => mdl.id != id);
    },

    addModule() {
      let mods = this.layout.modules;
      if (mods.length == 0) {
        mods.push({ id: 0, width: "1/3", content: { driver: "none" } });
      } else {
        let latest = mods[mods.length - 1].id;
        mods.push({
          id: latest + 1,
          width: "1/3",
          content: { driver: "none" },
        });
      }
    },

    activateModule(id, content) {
      let mdl = this.layout.modules.find((mdl) => mdl.id == id);
      mdl.content = content;
    },

    lock(status) {
      this.locked = status;
      if (status) {
        this.layout.modules = this.layout.modules.filter(
          (mdl) => mdl.content.driver != "none"
        );
      }
    },

    saveLayout() {
      if (this.layout.name == "") {
        this.notify("Enter a name");
        return;
      } else if (this.layout.modules.length == 0) {
        this.notify("Place at least one module");
        return;
      }
      if (this.layout.id == null) {
        api.createLayout(this.layout);
        this.notify("New layout created", "success");
      } else {
        api.updateLayout(this.layout.id, this.layout);
        this.notify("Layout saved", "success");
      }
    },

    resetLayout() {
      this.layout = {
        id: null,
        name: "",
        modules: [],
      };
    },

    deleteLayout() {
      if (confirm("Are you sure you want to delete this layout?")) {
        api.deleteLayout(this.layout.id);
        this.resetLayout();
        this.notify("layout deleted");
      }
    },

    notify(message, status = "") {
      this.$parent.$parent.notify(message, status);
    },
  },

  mounted() {
    window.layout = this;
  },
};
</script>
