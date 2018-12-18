let x = new Vue({
  el: '#login',
  data: {
    registerCard: false,
    user: {
      username: '',
      password: '',
      passwordConfirm: '',
      email: ''
    },
  },
  methods: {

    validate() {
      passed = true
      if (this.user.password.length < 6) {
        this.toast('Password needs to be at least 6 characters', 'danger')
        passed = false;
      }

      if (this.user.password != this.user.passwordConfirm) {
        this.toast("Password and confirmation don't match", 'danger')
        passed = false
      }

      if (this.user.username == '') {
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
        data: JSON.stringify(this.user),
        contentType: 'application/json',
        type: 'POST',
        success: function (response) {
          if (response == 'exists') {
            x.toast('User already exists', 'danger')
          } else if (response == 'success') {
            // Happy path, user registered, go to login
            x.toast('User saved')
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
            Cookies.set('username', x.user.username, { expires: 1 });
            Cookies.set('password', x.user.password, { expires: 1 });
            document.location = '/'
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
