const WebSocket = require('ws')
const message = require('./message')
const close = require('./close')
const error = require('./error')

const messageBus = require('../globals/event')

const webSocketCallback = () => {
    var ws = new WebSocket('wss://mec-storage.herokuapp.com')

    ws.onopen = function (test) {
        console.log('web socket connection')
    }
    ws.onmessage = message
    ws.onclose = close
    ws.onerror = error
    messageBus.on('send', (val) => {
        console.log('##########################################')
        console.log(val)
        console.log(messageBus.listenerCount())
        ws.send(JSON.stringify(val))

        console.log('##########################################after')
    })
}

module.exports = webSocketCallback
