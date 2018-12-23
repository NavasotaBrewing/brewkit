$.get('/users', (response) => {
  Middleware.users = JSON.parse(response);
})

Middleware = {
  user: JSON.parse(window.sessionStorage.getItem('user')),
  redirect: function(route) {
    document.location = route
  },

  restrictTo: function(role) {
    if (!this.loggedIn()) {
      this.redirect('/login')
      return;
    }

    switch (role) {
      case 'brewer':
        if (this.user.role != 'brewer') {
          this.redirect('/view')
        }
        break;

      case 'viewer':
        if (this.user.role != 'viewer' && this.user.role != 'brewer') {
          this.redirect('/login')
        }

      default:
        break;
    }
  },

  loggedIn: function () {
    if (!this.user || this.user == 'error') {
      return false
    }
    return true;
  },

  login: function(givenUser) {
    $.ajax('/login', {
      data: JSON.stringify(givenUser),
      contentType: 'application/json',
      type: 'POST',
      success: (response) => {
        if (response == 'error') {
          toast('Login failed', 'danger')
          return false;
        } else {
          foundUser = JSON.parse(response)
          foundUser.password = givenUser.password;
          toast('Logged in');
          this.user = foundUser;
          window.sessionStorage.setItem('user', JSON.stringify(this.user));
          this.redirect('/')
        }
      }
    })
  },

  logout: function() {
    window.sessionStorage.removeItem('user')
    this.redirect('/login')
  }
}

