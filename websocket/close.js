const webSocket = require('./');
const close = async () => {
  console.log('Reconnect will be attempted in 2 second.');
  setTime(() => {
    webSocket;
  }, 2000);
};

module.exports = close;
