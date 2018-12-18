let view = new Vue({
  el: '#view',
  data: {
    user: {}
  },
  mounted() {
    this.user = JSON.parse(Cookies.get('user'))
  }
})
