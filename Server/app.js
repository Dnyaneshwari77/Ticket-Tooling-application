const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const cookieParser = require("cookie-parser");
const socketIo = require("socket.io");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const port = process.env.PORT || 3000;

const UserRouter = require("./routes/Authentication/UserRoutes");
const EmployeeRouter = require("./routes/Authentication/EmployeesRoutes");
const TicketRouter = require("./routes/Tickets/TicketsRouter");
const EmployeeRout = require("./routes/Tickets/EmployeesRoute");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    transports: ["websocket", "polling"],
    credentials: true,
  },
  allowEIO3: true,
});

app.use(express.json());
app.use(cookieParser());

app.use(cors()); // You can set up CORS globally here if needed

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use("/api/v1/", UserRouter);
app.use("/api/v1/employees", EmployeeRout, EmployeeRouter);
app.use("/api/v1/tickets", TicketRouter);

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

io.use((socket, next) => {
  const token = socket.handshake.query.token;
  console.log("Token", token);
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return next(new Error("Authentication error"));
      socket.user = decoded;
      console.log("Decoded Data", decoded);
      next();
    });
  } else {
    next(new Error("Authentication error"));
  }
}).on("connection", (socket) => {
  console.log("New client connected:", socket.user.userId);

  socket.join(socket.user.userId.toString());

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.user._id);
  });
});

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
