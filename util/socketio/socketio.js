let io;

exports.startWS=(server)=>{
    io=require("socket.io")(server);

    io.on("connection", (socket)=>{
        console.log("New user connection",socket);
    })
}

exports.emitEvent = (event,data)=>{
    if(!io)
    {
        const error=new Error("The websocket in the server has not started");
        throw error;   
    }

    console.log("EVENT EMITTED",data);
    io.sockets.emit(event,data);
}

