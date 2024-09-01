const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors"); // Import the cors package
const Chat = require("./Models/chatSchema.js"); // Import the Chat model
require("dotenv").config();

const AuthUser = require("./Routes/Authentication.js");
const getUsers = require("./Routes/getUser.js");
const debateTops = require("./Routes/debate.js");
const chatRoutes = require("./Routes/chats.js");
const notificationRoutes = require("./Routes/notification.js");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins, change as needed
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 5000;

// Auth end points
app.use("/api", AuthUser);
app.use("/api", getUsers);
app.use("/api", debateTops);
app.use("/api", chatRoutes);
app.use("/api", notificationRoutes);

app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Simple get request
app.get("/", (req, res) => {
  res.send("Welcome to the debate app");
});

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
