let x = new Vue({
  el: '#login',
  data: {
    registerCard: true,
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
  },
  methods: {
    register() {
      if (this.newUser.username.length >= 4 && this.newUser.password == this.newUser.passwordConfirm) {
        $.ajax('/register', {
          data: JSON.stringify(this.newUser),
          contentType: 'application/json',
          type: 'POST',
        });
        // $.post('/register', {
        //   user: JSON.stringify(this.newUser)
        // });
      }
    }
  }
})
