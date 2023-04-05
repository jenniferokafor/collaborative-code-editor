const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
import { Socket } from "socket.io";

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket: Socket) => {
  let currentRoom = null;

  // join room
  socket.on("join_room", (data: string) => {
    currentRoom = data;
    socket.join(data);
    io.in(data).emit("user_count", io.sockets.adapter.rooms.get(data).size);
  });

  socket.on("disconnect", () => {
    if (currentRoom) {
      socket.leave(currentRoom);
      io.in(currentRoom).emit(
        "user_count",
        io.sockets.adapter.rooms.get(currentRoom)?.size || 0
      );
    }
  });

  // getting code changes
  socket.on("html_change", (data) => {
    io.in(currentRoom).emit("receive_html", data);
  });
  socket.on("css_change", (data) => {
    io.in(currentRoom).emit("receive_css", data);
  });
  socket.on("js_change", (data) => {
    io.in(currentRoom).emit("receive_js", data);
  });
});

server.listen(3001, () => {
  console.log("listening on port 3001");
});
