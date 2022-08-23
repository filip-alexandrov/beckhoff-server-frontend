const { plcManager } = require("./twincat");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const { Server } = require("socket.io");
const http = require("http");

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

plcManager.connectToPlc();

const port = 80;

// Sockets real time sensor communication
function sendData(target, value, timestamp) {
  io.emit("data", {
    target,
    value,
    timestamp,
  });
}

async function subscribeToVariable(data){
  let readObj = await plcManager.subscribeToVariable(sendData, data.variable);

  io.emit("subscription:status", {
    success: readObj.success,
    isSubscribed: readObj.success
  });
}

async function unsubscribeToVariable(data){
  let readObj = await plcManager.unsubscrbe();

  io.emit("subscription:status", {
    success: readObj.success,
    isSubscribed: !readObj.success
  });
}

io.on("connection", function (socket) {
  console.log("Connected succesfully to the socket ...");

  socket.on("subscribe:variable", subscribeToVariable);

  socket.on("disconnect:system", unsubscribeToVariable);
});

// serve assets, images, css, fonts, etc.
app.use("/", express.static(path.join(__dirname, "build")));
app.use("/static", express.static(path.join(__dirname, "static")));

// serve website
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "build", "index.html"))
);

// Sent back database json file
app.get("/api/database", async (req, res) => {
  res.sendFile(path.join(__dirname, "database.json"));
});

// api endpoint for connecting to system
app.post("/api/connectToPlc", async (req, res) => {
  console.log("Connecting to PLC...");
  let tcResp = await plcManager.connectToPlc();

  res.json(tcResp);
});

// api endpoint for disconnecting from system, currently dissallowed
app.post("/api/disconnectPlc", async (req, res) => {
  let tcResp = { success: true };
  // await plcManager.disconnectPlc();

  res.json(tcResp);
});

// api endpoint for getting status of plc
app.get("/api/getPlcStatus", async (req, res) => {
  let tcResp = await plcManager.getPlcStatus();

  res.json(tcResp);
});

// api endpoint for reading all inputs/outputs
app.get("/api", async (req, res) => {
  let tcResp = await plcManager.readAllValues();

  res.json(tcResp);
});

// api endpoint to write arbitrary object of values to plc
app.post("/api", async (req, res) => {
  let tcResp = await plcManager.writeToPlc(req.body);

  res.json(tcResp);
});

server.listen(port, () => {
  console.log("Example app listening on port " + port);
});
