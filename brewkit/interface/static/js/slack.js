function sendInSlack(message, url) {
  $.ajax({
    data: 'payload=' + JSON.stringify({'text': message}),
    dataType: 'json',
    processData: false,
    type: 'POST',
    url: url
  });
}
