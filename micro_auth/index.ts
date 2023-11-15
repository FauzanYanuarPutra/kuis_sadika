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
  // Assign the user to a room
  const room = `room${currentRoomNumber}`;
  socket.join(room);

  // Notify the user about their room
  socket.emit("room_assigned", { room });

  // Increment the room number if the current room is full
  const roomSize = io.sockets.adapter.rooms.get(room).size;
  if (roomSize >= maxPeoplePerRoom) {
    currentRoomNumber++;
  }

  // Broadcast to all clients in the room when a new user joins
  io.to(room).emit("user_joined", { username: "User" + socket.id });

  // Handle chat messages
  socket.on("chat_message", (message) => {
    io.to(room).emit("chat_message", { username: "User" + socket.id, message });
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    io.to(room).emit("user_left", { username: "User" + socket.id });
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
