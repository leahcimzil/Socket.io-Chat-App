const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req,res)=>{
    res.sendFile('chat.html', {root: __dirname});
});

//event connect
io.on('connect',socket =>{

    //console.log client id
    console.log(`client ${socket.id} connected`);
    
    //Define number of clients connected to server
    let clientCount = io.engine.clientsCount;
    
    //Log the number of clients connected to server 
    console.log(clientCount);

    //emit number of people connected
    io.emit('member', clientCount);
    
    //sending out a welcome message
    socket.emit('welcome', "Welcome to the socketchat");
    
    socket.on('message', message=>{
        io.emit('message', message);
    });

    //Sends out time evry second to client
    setInterval(()=>socket.emit('time', new Date().toTimeString()), 1000);
                   
    //when client disconnects    
    socket.on('disconnect',()=>{
                console.log(`Client ${socket.id} disconnected`);
                console.log(clientCount-1);   
                io.emit('member1', clientCount-1);
            });
            
        });

http.listen(3000, ()=>console.log('listening at 3000'));