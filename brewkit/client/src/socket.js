import io from 'socket.io-client'

export default {
  connect: function (addr) {
    this.io = io(addr)
    return this.io;
  },
}
