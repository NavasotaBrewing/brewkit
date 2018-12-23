function toast(message, status='success', timeout=3000) {
  UIkit.notification({ message: message, status: status, pos: 'bottom-left', timeout: 3000 });
}
