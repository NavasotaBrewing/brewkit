let x = new Vue({
  el: '#login',
  data: {
    registerCard: false,
    newUser: {
      name: '',
      username: '',
      password: '',
      passwordConfirm: '',
      email: ''
    },
    user: {
      username: '',
      password: ''
    }
  }
})
