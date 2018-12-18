if (!Cookies.get('user')) {
  user = {}
} else {
  user = JSON.parse(Cookies.get('user'))
}


Middleware = {
  user: user,
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
    if (this.user.username) {
      return true
    }
    return false
  }
}
