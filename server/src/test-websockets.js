const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const port = 80;

app.get("/api", (req, res) => {
  res.json({
    success: true,
    "GVL_OutputHMI.rCurrentLive": 0,
    "GVL_OutputHMI.rVoltageLive": 0,
    "GVL_OutputHMI.ST_SensorOutputs": {
      rTemperatureLive: [0, 0, 0, 0, 0, 0, 0, 0],
      rSmallForceLive: [0, 0, 0, 0],
      rBigForceLive: 0,
      rDistanceLive: [0, 0, 0, 0, 0, 0],
      rTemperatureLast: [0, 0, 0, 0, 0, 0, 0, 0],
      rSmallForceLast: [0, 0, 0, 0],
      rBigForceLast: 59898,
      rDistanceLast: [0, 0, 0, 0, 4343, 0],
    },
    "GVL_OutputHMI.rMotorPosition": 0,
    "GVL_OutputHMI.rMotorVelocity": 0,
    "GVL_OutputHMI.rMotorTorque": 0,
    "GVL_OutputHMI.bMotorFault": false,
    "GVL_OutputHMI.uiStatus": 0,
    "GVL_OutputHMI.sWarning": "",
    "GVL_OutputHMI.tElapsedTime": 0,
    "GVL_OutputHMI.uiMeasurementsFinished": 0,
    "GVL_OutputHMI.uiOverallMeasurements": 0,
    "GVL_InputHMI.e_OperationMode": { name: "A1", value: 0 },
    "GVL_InputHMI.rMinCurrent": 0,
    "GVL_InputHMI.rMaxCurrent": 0,
    "GVL_InputHMI.rCurrentStep": 0,
    "GVL_InputHMI.rMinAirgap": 0,
    "GVL_InputHMI.rMaxAirgap": 0,
    "GVL_InputHMI.rAirgapStep": 0,
    "GVL_InputHMI.bStartButton": false,
    "GVL_InputHMI.bEmergencyStop": false,
    "GVL_InputHMI.sCSVName": "",
    "GVL_InputHMI.tWaitBeforeMeasurement": 0,
    "GVL_InputHMI.bPause": false,
    "GVL_InputHMI.bManualMoveMotor": false,
    "GVL_InputHMI.rManualMotorPosition": 0,
    "GVL_InputHMI.rManualMotorVelocity": 0,
    "GVL_InputHMI.bDistanceSensorNulling": false,
  });
});

app.listen(port, () => {
  console.log("Example app listening on port " + port);
});
