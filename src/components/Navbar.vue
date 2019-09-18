<template>
  <div>
    <nav id="mainNavbar" class="uk-navbar-container" uk-navbar>
      <div class="uk-navbar-left">
        <ul id="navItems" class="uk-navbar-nav">
          <li
            :key="route.path"
            v-for="route in $router.options.routes"
            :class="{ 'uk-active': route.path == $route.path }"
          >
            <router-link :to="route.path">{{ route.name }}</router-link>
          </li>
        </ul>
      </div>
      <div class="uk-navbar-center">
        <ul class="uk-navbar-nav">
          <a target="_blank" href="http://navasotabrewing.com/">
            <!-- TODO: serve this -->
            <img class="uk-visible@s"
              width="40px"
              src="https://cdn1.iconfinder.com/data/icons/agriculture-13/48/7-512.png"
              alt
            />
          </a>
        </ul>
      </div>
    </nav>
  </div>
</template>

<style lang="css">
#navItems {
  margin-left: 1em;
}
</style>


<script>
export default {
  name: "Navbar"
};
</script>
