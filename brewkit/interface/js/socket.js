// Development
// brewkit_address = 'http://165.91.84.152:5000'
brewkit_address = 'http://0.0.0.0:5000'

var socket = io.connect(brewkit_address);

socket.on('connection', () => {
  console.log('Socket connected');
})

socket.on('log', function(message) {
  console.log(message);
});

socket.on('error', function(err_message) {
  console.error(err_message);
});
