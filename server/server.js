import express from 'express';
import socketio from 'socket.io';
import http from 'http';
import path from 'path';

const app = express();
const publicPath = path.resolve(__dirname, '../public');
const PORT = process.env.PORT || 3000;

let server = http.createServer(app);
let io = socketio(server);

io.on('connect', (client) => {
    
    client.emit("enviarMensaje", {
        user: "Admin",
        mensaje: "Welcome to Chat",
    })

    client.on('disconnect', () => {
        console.log("client desconectado");
    });

    //escuchar al cliente
    client.on('enviarMensaje', (mensaje, callback) => {
        console.log(mensaje);
        callback({
            status: 200,
            sended: true,
            read: true,
        })
    })
});

app.use(express.static(publicPath));

server.listen(PORT, (err) => {

    if(err) throw new Error(err);

    console.log("chat server is running");
});