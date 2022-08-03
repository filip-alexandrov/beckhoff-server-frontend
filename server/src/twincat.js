const ads = require("ads-client");

function logData({obj}){
  for(let key in obj){
    console.log(`${key}: ${obj[key]}`);
  }
}

async function writeValues(client) {
  console.log("\nWriting values (Starting test)...\n");

  await Promise.all([
    client.writeSymbol("GVL_InputHMI.e_OperationMode", "A2"),
    client.writeSymbol("GVL_InputHMI.rMinCurrent", 1.0),
    client.writeSymbol("GVL_InputHMI.rMaxCurrent", 90.21),
    client.writeSymbol("GVL_InputHMI.rCurrentStep", 0.1),
    client.writeSymbol("GVL_InputHMI.rMinAirgap", 0.5),
    client.writeSymbol("GVL_InputHMI.rMaxAirgap", 43.21),
    client.writeSymbol("GVL_InputHMI.rAirgapStep", 43.21),
    client.writeSymbol("GVL_InputHMI.bStartButton", true),
    client.writeSymbol("GVL_InputHMI.bEmergencyStop", false),
    client.writeSymbol("GVL_InputHMI.sCSVName", "test_48023984"),
    client.writeSymbol("GVL_InputHMI.tWaitBeforeMeasurement", 300),
    client.writeSymbol("GVL_InputHMI.bPause", false),

    client.writeSymbol("GVL_InputHMI.bManualMoveMotor", false),
    client.writeSymbol("GVL_InputHMI.rManualMotorPosition", 0),
    client.writeSymbol("GVL_InputHMI.rManualMotorVelocity", 0),
  ])
    .then(
      ([
        e_OperationMode,
        rMinCurrent,
        rMaxCurrent,
        rCurrentStep,
        rMinAirgap,
        rMaxAirgap,
        rAirgapStep,
        bStartButton,
        bEmergencyStop,
        sCSVName,
        tWaitBeforeMeasurement,
        bPause,

        bManualMoveMotor,
        rManualMotorPosition,
        rManualMotorVelocity,
      ]) => {
        console.log("e_OperationMode: ", e_OperationMode.value);
        console.log("rMinCurrent: ", rMinCurrent.value);
        console.log("rMaxCurrent: ", rMaxCurrent.value);
        console.log("rCurrentStep: ", rCurrentStep.value);
        console.log("rMinAirgap: ", rMinAirgap.value);
        console.log("rAirgapStep: ", rAirgapStep.value);
        console.log("rMaxAirgap: ", rMaxAirgap.value);
        console.log("bStartButton: ", bStartButton.value);
        console.log("bEmergencyStop: ", bEmergencyStop.value);
        console.log("sCSVName: ", sCSVName.value);
        console.log("tWaitBeforeMeasurement: ", tWaitBeforeMeasurement.value);
        console.log("bPause: ", bPause.value);

        console.log("bManualMoveMotor: ", bManualMoveMotor.value);
        console.log("rManualMotorPosition: ", rManualMotorPosition.value);
        console.log("rManualMotorVelocity: ", rManualMotorVelocity.value);
      }
    )
    .catch((err) => {
      console.log(err);
    });
}

async function readValues(client) {
  console.log("Reading all values...\n");

  await Promise.all([
    client.readSymbol("GVL_OutputHMI.rCurrentLive"),
    client.readSymbol("GVL_OutputHMI.rVoltageLive"),
    client.readSymbol("GVL_OutputHMI.ST_SensorOutputs"),
    client.readSymbol("GVL_OutputHMI.rMotorPosition"),
    client.readSymbol("GVL_OutputHMI.rMotorVelocity"),
    client.readSymbol("GVL_OutputHMI.rMotorTorque"),
    client.readSymbol("GVL_OutputHMI.bMotorFault"),
    client.readSymbol("GVL_OutputHMI.uiStatus"),
    client.readSymbol("GVL_OutputHMI.sWarning"),
    client.readSymbol("GVL_OutputHMI.tElapsedTime"),
    client.readSymbol("GVL_OutputHMI.uiMeasurementsFinished"),
    client.readSymbol("GVL_OutputHMI.uiOverallMeasurements"),

    client.readSymbol("GVL_InputHMI.e_OperationMode"),
    client.readSymbol("GVL_InputHMI.rMinCurrent"),
    client.readSymbol("GVL_InputHMI.rMaxCurrent"),
    client.readSymbol("GVL_InputHMI.rCurrentStep"),
    client.readSymbol("GVL_InputHMI.rMinAirgap"),
    client.readSymbol("GVL_InputHMI.rMaxAirgap"),
    client.readSymbol("GVL_InputHMI.rAirgapStep"),
    client.readSymbol("GVL_InputHMI.bStartButton"),
    client.readSymbol("GVL_InputHMI.bEmergencyStop"),
    client.readSymbol("GVL_InputHMI.sCSVName"),
    client.readSymbol("GVL_InputHMI.tWaitBeforeMeasurement"),
    client.readSymbol("GVL_InputHMI.bPause"),

    client.readSymbol("GVL_InputHMI.bManualMoveMotor"),
    client.readSymbol("GVL_InputHMI.rManualMotorPosition"),
    client.readSymbol("GVL_InputHMI.rManualMotorVelocity"),
  ])
    .then(
      (/* [
        rCurrentLive,
        rVoltageLive,
        ST_SensorOutputs,
        rMotorPosition,
        rMotorVelocity,
        rMotorTorque,
        bMotorFault,
        uiStatus,
        sWarning,
        tElapsedTime,
        uiMeasurementsFinished,
        uiOverallMeasurements,

        e_OperationMode,
        rMinCurrent,
        rMaxCurrent,
        rCurrentStep,
        rMinAirgap,
        rMaxAirgap,
        rAirgapStep,
        bStartButton,
        bEmergencyStop,
        sCSVName,
        tWaitBeforeMeasurement,
        bPause,

        bManualMoveMotor,
        rManualMotorPostion,
        rManualMotorVelocity,
      ] */ response) => {
        for(let element of response ){
          console.log(`${element.symbol.name}: ${JSON.stringify(element.value)}`);
        }
        /* console.log("rCurrentLive: ", rCurrentLive.symbol.name);
        console.log("rVoltageLive: ", rVoltageLive.value);

        console.log(
          "rTemperatureLive: ",
          ST_SensorOutputs.value.rTemperatureLive
        );
        console.log(
          "rSmallForceLive: ",
          ST_SensorOutputs.value.rSmallForceLive
        );
        console.log("rBigForceLive: ", ST_SensorOutputs.value.rBigForceLive);
        console.log("rDistanceLive: ", ST_SensorOutputs.value.rDistanceLive);

        console.log(
          "rTemperatureLast: ",
          ST_SensorOutputs.value.rTemperatureLast
        );
        console.log(
          "rSmallForceLast:: ",
          ST_SensorOutputs.value.rSmallForceLast
        );
        console.log("rBigForceLast: ", ST_SensorOutputs.value.rBigForceLast);
        console.log("rDistanceLast: ", ST_SensorOutputs.value.rDistanceLast);
        console.log("rMotorPosition: ", rMotorPosition.value);
        console.log("rMotorVelocity: ", rMotorVelocity.value);
        console.log("rMotorTorque: ", rMotorTorque.value);
        console.log("bMotorFault: ", bMotorFault.value);
        console.log("uiStatus: ", uiStatus.value);
        console.log("sWarning: ", sWarning.value);
        console.log("tElapsedTime: ", tElapsedTime.value);
        console.log("uiMeasurementsFinished: ", uiMeasurementsFinished.value);
        console.log("uiOverallMeasurements: ", uiOverallMeasurements.value);

        console.log("e_OperationMode: ", e_OperationMode.value);
        console.log("rMinCurrent: ", rMinCurrent.value);
        console.log("rMaxCurrent: ", rMaxCurrent.value);
        console.log("rCurrentStep: ", rCurrentStep.value);
        console.log("rMinAirgap: ", rMinAirgap.value);
        console.log("rAirgapStep: ", rAirgapStep.value);
        console.log("rMaxAirgap: ", rMaxAirgap.value);
        console.log("bStartButton: ", bStartButton.value);
        console.log("bEmergencyStop: ", bEmergencyStop.value);
        console.log("sCSVName: ", sCSVName.value);
        console.log("tWaitBeforeMeasurement: ", tWaitBeforeMeasurement.value);
        console.log("bPause: ", bPause.value);

        console.log("bManualMoveMotor: ", bManualMoveMotor.value);
        console.log("rManualMotorPostion: ", rManualMotorPostion.value);
        console.log("rManualMotorVelocity: ", rManualMotorVelocity.value); */
      }
    )
    .catch((err) => {
      console.log(err);
    });
}

const client = new ads.Client({
  targetAmsNetId: "169.254.113.74.1.1",
  targetAdsPort: 851,
});

const plc = client
  .connect()
  .then(async (res) => {
    console.log(`Connected to the ${res.targetAmsNetId}`);
    console.log(
      `Router assigned us AmsNetId ${res.localAmsNetId} and port ${res.localAdsPort}`
    );

    await readValues(client);

    console.log("Disconnecting...");
    return client.disconnect();
  })

  .catch((err) => {
    console.log("Something failed:", err);
  });
