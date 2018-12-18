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
  },
  methods: {

    validate() {
      passed = true
      if (this.newUser.password.length < 6) {
        this.toast('Password needs to be at least 6 characters', 'danger')
        passed = false;
      }

      if (this.newUser.password != this.newUser.passwordConfirm) {
        this.toast("Password and confirmation don't match", 'danger')
        passed = false
      }

      if (this.newUser.username == '') {
        this.toast('Please provide a username', 'danger')
        passed = false
      }

      return passed;
    },

    register() {
      if (!this.validate()) {
        return false;
      }
      $.ajax('/register', {
        data: JSON.stringify(this.newUser),
        contentType: 'application/json',
        type: 'POST',
        success: function (response) {
          if (response == 'exists') {
            x.toast('User already exists', 'danger')
          } else if (response == 'success') {
            // Happy path, user registered, go to login
            x.toast('User saved')
            x.user.username = x.newUser.usename;
            x.user.password = x.newUser.password;
            x.registerCard = false;
          }
        }
      });
    },

    toast(message, status = "success") {
      UIkit.notification(message, { status: status, pos: 'bottom-left' });
    },

    login() {
      if (this.user.username == '' || this.user.password == '') {
        this.toast('Please enter your username and password', 'danger');
      }

      $.ajax('/login', {
        data: JSON.stringify(this.user),
        contentType: 'application/json',
        type: 'POST',
        success: function(response) {
          if (response == 'success') {
            x.toast('Logged in')
          } else if (response == 'error') {
            x.toast('Username and password did not match', 'danger')
          } else if (response == 'not_found') {
            x.toast('User not found', 'danger')
          }
        }
      })
    }
  }
})
