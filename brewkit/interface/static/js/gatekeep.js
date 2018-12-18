function onLoginPage() {
  if (document.location.href.indexOf('/login') != -1) {
    return true;
  }
  return false;
}


user = {
  username: Cookies.get('username'),
  password: Cookies.get('password'),
}



if (onLoginPage()) {
  $.ajax('/login', {
    data: JSON.stringify(user),
    contentType: 'application/json',
    type: 'POST',
    success: function (response) {
      if (response == 'success') {
        document.location = '/'
      }
    }
  });
}

// if you're not on the login page
if (!onLoginPage()) {
  if (!user.username || !user.password) {
    document.location = '/login'
  }

  $.ajax('/login', {
    data: JSON.stringify(user),
    contentType: 'application/json',
    type: 'POST',
    success: function (response) {
      console.log(response)
    }
  });
}
