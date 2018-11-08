var socket = io.connect('http://' + document.domain + ':' + location.port);

socket.on('connection', () => {
  console.log('Socket connected');
})

socket.on('log', function(message) {
  console.log(message);
});

socket.on('error', function(err_message) {
  console.error(err_message);
});
