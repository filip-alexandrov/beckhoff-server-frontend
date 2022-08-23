const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const port = 80;

io.on("connection", (socket) =>  {
  constole.log(message); 
  io.emit("message", message); 
})

server.listen(port, () => {
  console.log("Example app listening on port " + port);
});
