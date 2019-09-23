export default {
  send(webhook, message) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", webhook, true);
    xhttp.send(JSON.stringify({
      text: message
    }));
  }
}
