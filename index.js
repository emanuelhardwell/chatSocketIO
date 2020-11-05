/*
 */
const path = require("path");
const express = require("express");
const socketIo = require("socket.io");

const app = express();

//settings
app.set("port", process.env.PORT || 3000);

//start files
app.use(express.static(path.join(__dirname, "public")));

//satrt the server
const server = app.listen(app.get("port"), () => {
  console.log("Server listening on port ", app.get("port"));
});

//web sockets
const io = socketIo(server);

io.on("connection", (socket) => {
  console.log("nueva conexion", socket.id);

  socket.on("messageBrowser", (data) => {
    /* console.log(data); */
    io.sockets.emit("messageServer", data);
  });

  socket.on("typingBrowser", (data) => {
    socket.broadcast.emit("typingServer", data);
  });
});
