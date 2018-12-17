var socket = null
$.get('/hardware_address', function(address) {
  socket = io.connect(address);
})
