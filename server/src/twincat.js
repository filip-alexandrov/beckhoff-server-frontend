const ads = require("ads-client");

function logData({ obj }) {
  for (let key in obj) {
    console.log(`${key}: ${obj[key]}`);
  }
}

async function writeStartTest(client) {
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

async function readAllValues(client) {
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
    .then((response) => {
      let readObj = {};

      for (let element of response) {
        readObj[`${element.symbol.name}`] = element.value;
      }

      return readObj;
    })
    .catch((err) => {
      console.log(err);
    });
}

const client = new ads.Client({
  targetAmsNetId: "169.254.113.74.1.1",
  targetAdsPort: 851,
});

/* const plc = client
  .connect()
  .then(async (res) => {
    console.log(`Connected to the ${res.targetAmsNetId}`);
    console.log(
      `Router assigned us AmsNetId ${res.localAmsNetId} and port ${res.localAdsPort}`
    );

    await readAllValues(client);

    console.log("Disconnecting...");
    return client.disconnect();
  })

  .catch((err) => {
    console.log("Something failed:", err);
  }); */

let plcManager = {
  client: new ads.Client({
    targetAmsNetId: "169.254.113.74.1.1",
    targetAdsPort: 851,
  }),

  openConnection: undefined, // read and write pipeline to client

  async connectToPlc() {
    this.openConnection = await this.client.connect();

    console.log(`Connected to the ${this.openConnection.targetAmsNetId}`);
    console.log(
      `Router assigned us AmsNetId ${this.openConnection.localAmsNetId} and port ${this.openConnection.localAdsPort}`
    );
  },

  async readAllValues() {
    console.log("Reading all values...\n");
    let readObj = {};

    await Promise.all([
      this.client.readSymbol("GVL_OutputHMI.rCurrentLive"),
      this.client.readSymbol("GVL_OutputHMI.rVoltageLive"),
      this.client.readSymbol("GVL_OutputHMI.ST_SensorOutputs"),
      this.client.readSymbol("GVL_OutputHMI.rMotorPosition"),
      this.client.readSymbol("GVL_OutputHMI.rMotorVelocity"),
      this.client.readSymbol("GVL_OutputHMI.rMotorTorque"),
      this.client.readSymbol("GVL_OutputHMI.bMotorFault"),
      this.client.readSymbol("GVL_OutputHMI.uiStatus"),
      this.client.readSymbol("GVL_OutputHMI.sWarning"),
      this.client.readSymbol("GVL_OutputHMI.tElapsedTime"),
      this.client.readSymbol("GVL_OutputHMI.uiMeasurementsFinished"),
      this.client.readSymbol("GVL_OutputHMI.uiOverallMeasurements"),

      this.client.readSymbol("GVL_InputHMI.e_OperationMode"),
      this.client.readSymbol("GVL_InputHMI.rMinCurrent"),
      this.client.readSymbol("GVL_InputHMI.rMaxCurrent"),
      this.client.readSymbol("GVL_InputHMI.rCurrentStep"),
      this.client.readSymbol("GVL_InputHMI.rMinAirgap"),
      this.client.readSymbol("GVL_InputHMI.rMaxAirgap"),
      this.client.readSymbol("GVL_InputHMI.rAirgapStep"),
      this.client.readSymbol("GVL_InputHMI.bStartButton"),
      this.client.readSymbol("GVL_InputHMI.bEmergencyStop"),
      this.client.readSymbol("GVL_InputHMI.sCSVName"),
      this.client.readSymbol("GVL_InputHMI.tWaitBeforeMeasurement"),
      this.client.readSymbol("GVL_InputHMI.bPause"),

      this.client.readSymbol("GVL_InputHMI.bManualMoveMotor"),
      this.client.readSymbol("GVL_InputHMI.rManualMotorPosition"),
      this.client.readSymbol("GVL_InputHMI.rManualMotorVelocity"),
    ])
      .then((response) => {
        for (let element of response) {
          readObj[`${element.symbol.name}`] = element.value;
        }
      })
      .catch((err) => {
        throw err;
      });

      return readObj;
  },
};

async function main() {
  await plcManager.connectToPlc();

  let resp = await plcManager.readAllValues();
  console.log(resp);
}

main();
