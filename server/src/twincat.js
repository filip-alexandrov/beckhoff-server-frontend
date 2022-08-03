const ads = require("ads-client");

// Single object with preconfigured in client twincat connection data
export let plcManager = {
  client: new ads.Client({
    targetAmsNetId: "169.254.113.74.1.1",
    targetAdsPort: 851,
  }),

  // Connects to Twincat system and logs 
  async connectToPlc() {
    let openConnection = await this.client.connect();

    console.log(`Connected to the ${openConnection.targetAmsNetId}`);
    console.log(
      `Router assigned us AmsNetId ${openConnection.localAmsNetId} and port ${openConnection.localAdsPort}`
    );
  },

  // Disconnects from Twincat system
  async disconnectPlc() {
    console.log("Disconnecting...");

    await this.client.disconnect();
  },

  // Will read all input and output values from Twincat
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

  // Will write all input vars needed to start/stop a test
  async writeStartTest(
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
    bPause
  ) {
    console.log("Writing values (Starting test)...\n");
    let readObj = {};

    await Promise.all([
      this.client.writeSymbol("GVL_InputHMI.e_OperationMode", e_OperationMode),
      this.client.writeSymbol("GVL_InputHMI.rMinCurrent", rMinCurrent),
      this.client.writeSymbol("GVL_InputHMI.rMaxCurrent", rMaxCurrent),
      this.client.writeSymbol("GVL_InputHMI.rCurrentStep", rCurrentStep),
      this.client.writeSymbol("GVL_InputHMI.rMinAirgap", rMinAirgap),
      this.client.writeSymbol("GVL_InputHMI.rMaxAirgap", rMaxAirgap),
      this.client.writeSymbol("GVL_InputHMI.rAirgapStep", rAirgapStep),
      this.client.writeSymbol("GVL_InputHMI.bStartButton", bStartButton),
      this.client.writeSymbol("GVL_InputHMI.bEmergencyStop", bEmergencyStop),
      this.client.writeSymbol("GVL_InputHMI.sCSVName", sCSVName),
      this.client.writeSymbol(
        "GVL_InputHMI.tWaitBeforeMeasurement",
        tWaitBeforeMeasurement
      ),
      this.client.writeSymbol("GVL_InputHMI.bPause", bPause),
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

  // will write all inputs needed to manually control the motor
  async writeManualMotor(
    bManualMoveMotor,
    rManualMotorPosition,
    rManualMotorVelocity
  ) {
    console.log("Writing values (Manual Motor)...\n");

    let readObj = {};

    await Promise.all([
      this.client.writeSymbol(
        "GVL_InputHMI.bManualMoveMotor",
        bManualMoveMotor
      ),
      this.client.writeSymbol(
        "GVL_InputHMI.rManualMotorPosition",
        rManualMotorPosition
      ),
      this.client.writeSymbol(
        "GVL_InputHMI.rManualMotorVelocity",
        rManualMotorVelocity
      ),
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

  await plcManager.readAllValues();
  await plcManager.writeStartTest(
    "A1",
    1.0,
    90.21,
    0.1,
    0.5,
    43.21,
    23.21,
    true,
    false,
    "test_49238",
    300,
    false
  );
  let resp = await plcManager.writeManualMotor(false, 0, 0);
  await plcManager.disconnectPlc();

  console.log(resp);
}

main();
