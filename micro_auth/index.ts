import { AppDataSource } from "./data-source";
import { startGRPCServer } from "./grpcServer";
import * as cors from 'cors'

const express = require("express");
// const http = require("http");
// const socketIO = require("socket.io");
const app = express();
// const server = http.createServer(app);
// const io = socketIO(server);

const PORT = 3000;

AppDataSource.initialize().then(async () => {
    const app = express()
    const port = 5000

    app.use(cors())
    app.use(express.json())

    app.get("/", (req, res) => {
      res.send("Socket.IO server is running.");
    });

    startGRPCServer();

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch(error => console.log(error))


// const maxPeoplePerRoom = 5;
// let rooms = {}; // Object to store rooms dynamically

// io.on("connection", (socket) => {
//   let userRoom;

//   const joinRoom = () => {
//     // Find or create a new room
//     const availableRoom = Object.keys(rooms).find(
//       (room) => rooms[room].length < maxPeoplePerRoom
//     );

//     if (availableRoom) {
//       userRoom = availableRoom;
//     } else {
//       userRoom = `room${Object.keys(rooms).length + 1}`;
//       rooms[userRoom] = [];
//     }

//     socket.join(userRoom);
//     rooms[userRoom].push(socket.id);

//     socket.emit("room_assigned", { room: userRoom });

//     io.to(userRoom).emit("user_joined", { username: "User" + socket.id });

//     // Check if the room is full
//     if (rooms[userRoom].length === maxPeoplePerRoom) {
//       // Create a new room if needed
//       userRoom = `room${Object.keys(rooms).length + 1}`;
//       rooms[userRoom] = [];
//     }
//   };

//   joinRoom();

//   socket.on("chat_message", (message) => {
//     io.to(userRoom).emit("chat_message", { username: "User" + socket.id, message });
//   });

//   socket.on("disconnect", () => {
//     io.to(userRoom).emit("user_left", { username: "User" + socket.id });

//     // Remove the user from the room
//     rooms[userRoom] = rooms[userRoom].filter((id) => id !== socket.id);

//     // If the room is empty, remove it
//     if (rooms[userRoom].length === 0) {
//       delete rooms[userRoom];
//     }
//   });
// });

