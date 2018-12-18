function onLoginPage() {
  if (document.location.href.indexOf('/login') != -1) {
    return true;
  }
  return false;
}


$.get('/tokens', function (response) {
  tokens = JSON.parse(response);
  userstring = Cookies.get('user')
  if (userstring != null) {
    user = JSON.parse(Cookies.get('user'));
  } else {
    if (!onLoginPage()) {
      document.location = '/login'
    }
  }

  // If there is a user but no token
  if (tokens.indexOf(user.token) != -1) {
    if (onLoginPage()) {
      document.location = '/'
    }
  } else {
    if (!onLoginPage()) {
      document.location = '/login'
    }
  }
})
