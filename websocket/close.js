const connect = require('./')
const close = (connection) => {
    connection.on('close', async () => {
        console.log('Connection closed')
        setTimeout(() => {
            connect()
        }, 5000)
    })
}

module.exports = close
