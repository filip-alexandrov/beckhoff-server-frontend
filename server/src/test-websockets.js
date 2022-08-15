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

// Handle connection
io.on("connection", function (socket) {
  console.log("Connected succesfully to the socket ...");

  socket.on("get data", function (data) {
    socket.emit("get data", {
      success: true,
      "GVL_OutputHMI.rCurrentLive": Math.random(),
      "GVL_OutputHMI.rVoltageLive": Math.random(),
      "GVL_OutputHMI.ST_SensorOutputs": {
        rTemperatureLive: [
          Math.random(),
          Math.random(),
          Math.random(),
          Math.random(),
          Math.random(),
          Math.random(),
          Math.random(),
          Math.random(),
        ],
        rSmallForceLive: [
          Math.random(),
          Math.random(),
          Math.random(),
          Math.random(),
        ],
        rBigForceLive: Math.random(),
        rDistanceLive: [
          Math.random(),
          Math.random(),
          Math.random(),
          Math.random(),
          Math.random(),
          Math.random(),
        ],
        rTemperatureLast: [
          Math.random(),
          Math.random(),
          Math.random(),
          Math.random(),
          Math.random(),
          Math.random(),
          Math.random(),
          Math.random(),
        ],
        rSmallForceLast: [
          Math.random(),
          Math.random(),
          Math.random(),
          Math.random(),
        ],
        rBigForceLast: 59898,
        rDistanceLast: [
          Math.random(),
          Math.random(),
          Math.random(),
          Math.random(),
          4343,
          Math.random(),
        ],
      },
      "GVL_OutputHMI.rMotorPosition": Math.random(),
      "GVL_OutputHMI.rMotorVelocity": Math.random(),
      "GVL_OutputHMI.rMotorTorque": Math.random(),
      "GVL_OutputHMI.bMotorFault": false,
      "GVL_OutputHMI.uiStatus": Math.random(),
      "GVL_OutputHMI.sWarning": "",
      "GVL_OutputHMI.tElapsedTime": Math.random(),
      "GVL_OutputHMI.uiMeasurementsFinished": Math.random(),
      "GVL_OutputHMI.uiOverallMeasurements": Math.random(),
      "GVL_InputHMI.e_OperationMode": { name: "A1", value: Math.random() },
      "GVL_InputHMI.rMinCurrent": Math.random(),
      "GVL_InputHMI.rMaxCurrent": Math.random(),
      "GVL_InputHMI.rCurrentStep": Math.random(),
      "GVL_InputHMI.rMinAirgap": Math.random(),
      "GVL_InputHMI.rMaxAirgap": Math.random(),
      "GVL_InputHMI.rAirgapStep": Math.random(),
      "GVL_InputHMI.bStartButton": false,
      "GVL_InputHMI.bEmergencyStop": false,
      "GVL_InputHMI.sCSVName": "",
      "GVL_InputHMI.tWaitBeforeMeasurement": Math.random(),
      "GVL_InputHMI.bPause": false,
      "GVL_InputHMI.bManualMoveMotor": false,
      "GVL_InputHMI.rManualMotorPosition": Math.random(),
      "GVL_InputHMI.rManualMotorVelocity": Math.random(),
      "GVL_InputHMI.bDistanceSensorNulling": false,
    });
  });
});

app.get("/api", (req, res) => {
  res.set("Cache-control", `no-store`);

  res.json({
    success: true,
    "GVL_OutputHMI.rCurrentLive": Math.random(),
    "GVL_OutputHMI.rVoltageLive": Math.random(),
    "GVL_OutputHMI.ST_SensorOutputs": {
      rTemperatureLive: [
        Math.random(),
        Math.random(),
        Math.random(),
        Math.random(),
        Math.random(),
        Math.random(),
        Math.random(),
        Math.random(),
      ],
      rSmallForceLive: [
        Math.random(),
        Math.random(),
        Math.random(),
        Math.random(),
      ],
      rBigForceLive: Math.random(),
      rDistanceLive: [
        Math.random(),
        Math.random(),
        Math.random(),
        Math.random(),
        Math.random(),
        Math.random(),
      ],
      rTemperatureLast: [
        Math.random(),
        Math.random(),
        Math.random(),
        Math.random(),
        Math.random(),
        Math.random(),
        Math.random(),
        Math.random(),
      ],
      rSmallForceLast: [
        Math.random(),
        Math.random(),
        Math.random(),
        Math.random(),
      ],
      rBigForceLast: 59898,
      rDistanceLast: [
        Math.random(),
        Math.random(),
        Math.random(),
        Math.random(),
        4343,
        Math.random(),
      ],
    },
    "GVL_OutputHMI.rMotorPosition": Math.random(),
    "GVL_OutputHMI.rMotorVelocity": Math.random(),
    "GVL_OutputHMI.rMotorTorque": Math.random(),
    "GVL_OutputHMI.bMotorFault": false,
    "GVL_OutputHMI.uiStatus": Math.random(),
    "GVL_OutputHMI.sWarning": "",
    "GVL_OutputHMI.tElapsedTime": Math.random(),
    "GVL_OutputHMI.uiMeasurementsFinished": Math.random(),
    "GVL_OutputHMI.uiOverallMeasurements": Math.random(),
    "GVL_InputHMI.e_OperationMode": { name: "A1", value: Math.random() },
    "GVL_InputHMI.rMinCurrent": Math.random(),
    "GVL_InputHMI.rMaxCurrent": Math.random(),
    "GVL_InputHMI.rCurrentStep": Math.random(),
    "GVL_InputHMI.rMinAirgap": Math.random(),
    "GVL_InputHMI.rMaxAirgap": Math.random(),
    "GVL_InputHMI.rAirgapStep": Math.random(),
    "GVL_InputHMI.bStartButton": false,
    "GVL_InputHMI.bEmergencyStop": false,
    "GVL_InputHMI.sCSVName": "",
    "GVL_InputHMI.tWaitBeforeMeasurement": Math.random(),
    "GVL_InputHMI.bPause": false,
    "GVL_InputHMI.bManualMoveMotor": false,
    "GVL_InputHMI.rManualMotorPosition": Math.random(),
    "GVL_InputHMI.rManualMotorVelocity": Math.random(),
    "GVL_InputHMI.bDistanceSensorNulling": false,
  });
});

server.listen(port, () => {
  console.log("Example app listening on port " + port);
});
