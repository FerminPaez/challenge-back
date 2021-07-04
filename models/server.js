const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config.db');
const http = require('http');
const { socketController, disconnect } = require('../sockets/socket.controller');

class Server {
    whiteList = ['http://localhost:4200']
    corsOptions = {
        origin: (origin, callback) =>{
            if(this.whiteList.indexOf(origin) !== -1){
                callback(null, true)
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials:true
    }
   

    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.server = http.createServer( this.app )
        this.io = require('socket.io')(this.server,{
            cors: {
                origin:true,
                credentials:true
            }
        }) 


        this.authPath = '/api/auth'
        this.userPath = '/api/users';
        this.meetPath = '/api/meet'
        

        this.connectionDB();

        this.middlewares();
        this.routes();

        this.sockets()
    }

    async connectionDB(){
        await dbConnection();
    }

    middlewares(){
        // CORS
        //this.app.use(cors(this.corsOptions))
        this.app.use(cors())
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth.routes'));
        this.app.use(this.userPath, require('../routes/user.routes'));
        this.app.use(this.meetPath, require('../routes/meet.routes'))

    }

    
    sockets = () => { console.log('escuchando conexiones')
        this.io.on( 'connection', client => {
            
            console.log('New Client Conections ' + client)
            disconnect(client)
        })
        this.io.emit()
    }
    
    //listen = ()=> this.server.listen(this.port, console.log('Sever run in port ', this.port))
    listen = ( callback )=> this.server.listen(this.port, callback)
}

module.exports = Server;