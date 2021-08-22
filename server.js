const express = require("express");
const app = express();
const { v4: uuidv4 } = require("uuid");

var cors = require("cors");
app.use(cors());

// var admin = require("firebase-admin");

// var serviceAccount = require("./chat-app-a9cfd-firebase-adminsdk-3rtdm-d8b0c80f9b.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

let client = {};

let users = [];

const http = require("http").createServer(app);
io = require("socket.io")(http, {
  cors: {
    origin: ["https://whatsappclone-5d611.web.app"],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("Register", ({ name }) => {
    if (client.hasOwnProperty(name) == false) {
      socket.name = name;
      users.push(name);
      client[name] = socket;
      console.log(name + " connected");
      socket.emit("UserList", users);
        socket.emit("user-R",{
        success: true,
        message:"User with Same name already exists"
        })
        console.log(users);

      socket.broadcast.emit("UserList", users);
      socket.emit("UserList", users);

    }else{
        socket.emit("user-R",{
            success: false,
            message:"User with Same name already exists"
        })
    }
  });

  socket.on("sendMessage", (data) => {
    console.log(data);
    if (client.hasOwnProperty(data.recieverName)) {
      client[data.recieverName].emit("recieveMessage", data);
    }
  });

  socket.on("disconnect", () => {
    delete client[socket.name];
    console.log(socket.name + " disconnected");
    users = users.filter((name) => name !== socket.name);
    console.log(users);
    socket.broadcast.emit("UserList", users);
  });
});

const port = process.env.PORT || 4000;
http.listen(port, () => {
  console.log("Hosted at port " + port);
});
