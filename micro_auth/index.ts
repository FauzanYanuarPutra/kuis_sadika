import { startGRPCServer } from "./grpcServer";

const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Socket.IO server is running.");
});

startGRPCServer();

const maxPeoplePerRoom = 5;
let currentRoomNumber = 1;

io.on("connection", (socket) => {
  const room = `room${currentRoomNumber}`;
  socket.join(room);

  socket.emit("room_assigned", { room });

  const roomSize = io.sockets.adapter.rooms.get(room).size;
  if (roomSize >= maxPeoplePerRoom) {
    currentRoomNumber++;
  }

  io.to(room).emit("user_joined", { username: "User" + socket.id });

  socket.on("chat_message", (message) => {
    io.to(room).emit("chat_message", { username: "User" + socket.id, message });
  });

  socket.on("disconnect", () => {
    io.to(room).emit("user_left", { username: "User" + socket.id });
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
