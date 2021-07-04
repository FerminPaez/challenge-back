const { Socket } = require("socket.io")

const socketController = ( socket ) =>{

    console.log( 'cliente conectado ', socket.id)
}

const disconnect = ( client ) =>{
    client.on('disconnect', ()=> console.log('Client disconnect'))
}

const emitMeet = ( client=Socket, meet ) =>{
    client.emit('emit-notification', meet )
}

module.exports = {
    socketController,
    disconnect,
    emitMeet
}