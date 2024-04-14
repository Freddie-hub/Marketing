// socketIoHelper.js

const socketIo = require('socket.io');

let ioInstance;

function initializeSocketIo(server) {
  ioInstance = socketIo(server);
  // Add your socket.io configuration here
  // For example, handling events and namespaces
  return ioInstance;
}

function getIo() {
  if (!ioInstance) {
    throw new Error('Socket.io has not been initialized.');
  }
  return ioInstance;
}

module.exports = {
  initializeSocketIo,
  getIo,
};
