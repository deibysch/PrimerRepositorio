import path, { join } from 'path';

//const morgan = require('morgan')
import {PORTclient, PORT} from './config.js'
import express from 'express'
import http from 'http'
import {Server as socketio} from 'socket.io'
import {dirname} from 'path'
import { fileURLToPath } from 'url';

const app = express()
const __dirname=dirname(fileURLToPath(import.meta.url))
console.log(__dirname);
const servidor = http.createServer(app)
const io = new socketio(servidor,{
    cors:{
        //origin: 'http://localhost:'+PORTclient
        origin: '*'
    }
})

io.on('connection', (socket)=>{
    console.log(`User ${socket.id} conectado`)
    io.emit('chat',socket.id+": conectado");
    socket.idlineaactual=null;
    socket.on("UnirPasajeroaLinea", async (idlinea)=>{
        if(socket.idlineaactual!=null){
            socket.leave(socket.idlineaactual)
            socket.leave("pas"+socket.idlineaactual)
            console.log(`Pasajero ${socket.id} abandono la sala: pas${socket.idlineaactual}`);
            console.log(`SALA pas${socket.idlineaactual}: `,await io.to("pas"+socket.idlineaactual).allSockets())
        }
        socket.join([idlinea, "pas"+idlinea]);
        socket.idlineaactual=idlinea;
        console.log(`Pasajero ${socket.id} se unio a la sala: pas${idlinea}`);
        //io.to(socket.idlineaactual).emit('chat', "mi linea es:"+socket.idlineaactual);
        socket.to(socket.idlineaactual).emit('chat', "mi linea es:"+socket.idlineaactual);
        console.log(`SALA pas${idlinea}: `,await io.to("pas"+idlinea).allSockets())
    })

    socket.on("DesconectarPasajeroDeLinea", async ()=>{
        socket.leave(socket.idlineaactual)
        socket.leave("pas"+socket.idlineaactual)
        console.log(`Pasajero ${socket.id} abandono la sala: pas${socket.idlineaactual}`);
        console.log(`SALA pas${socket.idlineaactual}: `,await io.to("pas"+socket.idlineaactual).allSockets())
        socket.idlineaactual=null;
    })
    
    socket.on("UnirConductoraLinea", async (idlinea, idubicacion)=>{
        if(socket.idlineaactual!=null){
            socket.leave(socket.idlineaactual)
            socket.leave("cond"+socket.idlineaactual)
            console.log(`Conductor ${socket.id} abandono la sala: cond${socket.idlineaactual}`);
            console.log(`SALA cond${socket.idlineaactual}: `,await io.to("cond"+socket.idlineaactual).allSockets())
        }
        socket.idubicacion=idubicacion;
        socket.idlineaactual=idlinea;
        socket.join([socket.idlineaactual, "cond"+socket.idlineaactual]);
        console.log(`Conductor ${socket.id} se unio a la sala: cond${socket.idlineaactual}`);
        console.log(`SALA cond${socket.idlineaactual}: `,await io.to("cond"+socket.idlineaactual).allSockets())
    })
    
    socket.on("Ubicacion", (Ubicacion)=>{
        socket.to("pas"+socket.idlineaactual).emit('Ubicacion', Ubicacion);
    })
    
    socket.on("DetenerUbicacionDelConductor", ()=>{
        socket.to("pas"+socket.idlineaactual).emit('DetenerUbicacionDelConductor', socket.idubicacion);
        console.log(`Conductor ${socket.id} de la linea cond${socket.idlineaactual} dejo de compartir su Ubicacion`);
    })
    
    
    socket.emit('chat', 
`id: ${socket.id}
server: ${socket.handshake.headers.host}
origin: ${socket.handshake.headers.origin}
referer: ${socket.handshake.headers.referer}
dir: ${__dirname}
port: ${PORT}`
    );

    socket.on('chat', (msg)=>{
        console.log(msg);
        io.emit('chat', msg)
    }) 
    socket.on('disconnect', ()=>{
        console.log(`User ${socket.id} desconectado`);
        io.emit('chat',socket.id+": desconectado");
    })
})

// app.get('/', (req, res) => {
//     res.send(`<h1>vaya a la <a href="http://localhost:3000">Pagina Principal<a/></h1>`)
//     //res.sendFile(`${__dirname}/cliente/index.html`)
// })

app.use(express.static(join(__dirname,'../Client/build')))

servidor.listen(PORT, () => {
    console.log('Servidor corriendo en http://localhost:'+PORT)
})