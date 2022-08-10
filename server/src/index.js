const { plcManager } = require("./twincat");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

plcManager.connectToPlc();

const port = 80;

// serve assets, images, css, fonts, etc.
app.use("/", express.static(path.join(__dirname, "build")));
app.use("/static", express.static(path.join(__dirname, "static")));
app.use(cors());

// serve website
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "build", "index.html"))
);

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

app.listen(port, () => {
  console.log("Example app listening on port " + port);
});
