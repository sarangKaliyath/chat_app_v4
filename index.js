const express = require("express");
const app = express();
// const app = require("express")();

// const { rmSync } = require("fs");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = 3000;

const user_data = {};

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "./index.html");
// });
const path = require("path");
app.use(express.static(path.join(__dirname, "Public")));

io.on("connection", (socket) => {
  socket.on("user_joined", function (data) {
    user_data[socket.id] = data;
    socket.broadcast.emit("user_joined", data);
  });

  socket.on("input_message", (data) => {
    io.emit("input_message", { data: data, name: user_data[socket.id] });
  });
  socket.on("disconnect", (data) => {
    socket.broadcast.emit("user_left", user_data[socket.id]);
  });
});

server.listen(port, () => {
  console.log(`listening on port: ${port}`);
});