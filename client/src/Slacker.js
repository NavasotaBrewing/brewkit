export default {
  send: function (text, url) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.send(JSON.stringify({text: text}));
  }
}
