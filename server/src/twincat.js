const ads = require("ads-client");
const { json } = require("body-parser");
const fs = require("fs");

// loggs events in the console (shown in node-windows)
function logger(module, func, type, message) {
  // moudle: file where the log is made
  // func: function where the log is made
  // type: type of log (info, error, etc)
  // message: message to be logged (the error if there is one)
  let timestamp = new Date().toISOString();

  /* console.log(
    `[${timestamp}] \n\t\t module: ${module} \n\t\t function: ${func} \n\t\t type: ${type} \n\t\t message: ${message}`
  ); */
}

// Single object with preconfigured in client twincat connection data
let plcManager = {
  client: new ads.Client({
    targetAmsNetId: "169.254.113.74.1.1",
    targetAdsPort: 851,
  }),

  database: [],

  async loadDatabase() {
    logger("twincat", "loadDatabase", "info", "Loading database");

    let data = fs.readFileSync("./database.json");
    this.database = JSON.parse(data);
  },

  // Connects to Twincat system and logs
  async connectToPlc() {
    let readObj = {};

    await this.client
      .connect()
      .then(async (res) => {
        logger(
          "twincat",
          "connectToPlc",
          "info",
          `Connected to the ${res.targetAmsNetId} Router assigned us AmsNetId ${res.localAmsNetId} and port ${res.localAdsPort}`
        );

        // init databases and start querying runtime values
        await this.loadDatabase(); 
        this.startWritingToDatabase(); 

        console.log(`Connected to the ${res.targetAmsNetId} Router assigned us AmsNetId ${res.localAmsNetId} and port ${res.localAdsPort}`)

        readObj.success = true;
      })
      .catch((err) => {
        logger("twincat", "connectToPlc", "error", err);

        console.log(err)

        readObj.success = false;
      });

    return readObj;
  },

  // Disconnects from Twincat system
  async disconnectPlc() {
    let readObj = {};

    await this.client
      .disconnect()
      .then(() => {
        logger("twincat", "disconnectPlc", "info", "Disconnected from Twincat");

        readObj.success = true;
      })
      .catch((err) => {
        logger("twincat", "disconnectPlc", "error", err);

        readObj.success = false;
        readObj.errorMessage = err;
      });

    return readObj;
  },

  // Get if the PLC is connected
  async getPlcStatus() {
    console.log("Getting PLC Status\n");

    let readObj = {};

    await Promise.all([
      this.client.readPlcRuntimeState(),
      this.client.readDeviceInfo(),
    ])
      .then(([plcRuntimeState, deviceInfo]) => {
        logger("twincat", "getPlcStatus", "info", "PLC Status is 'up'");
        readObj.success = true;

        readObj.plcRuntimeState = plcRuntimeState;
        readObj.deviceInfo = deviceInfo;
      })
      .catch((err) => {
        logger("twincat", "getPlcStatus", "error", err);
        console.log(err);

        readObj.success = false;
        readObj.errorMessage = err;
      });

    return readObj;
  },

  // writes in database.json cyclicly
  startWritingToDatabase() {
    logger("twincat", "startWritingToDatabase", "info", "Writing to database");

    setInterval(async () => {
      await Promise.all([
        this.client.readSymbol("GVL_OutputHMI.ST_SensorOutputs"),
        this.client.readSymbol("GVL_OutputHMI.rCurrentLast"),
      ])
        .then(([stSensorOutputs, rCurrentLast]) => {
          let currentF = stSensorOutputs.value.rBigForceLast;

          let sumOfDistances = stSensorOutputs.value.rDistanceLast.reduce(
            (a, b) => a + b,
            0
          );
          let currentD =
            sumOfDistances / stSensorOutputs.value.rDistanceLast.length;

          let currentI = rCurrentLast.value;

          let lastEntry = this.database[this.database.length - 1];

          let lastF = lastEntry.F;
          let lastD = lastEntry.D;
          let lastI = lastEntry.I;

          if (currentF != lastF || currentD != lastD || currentI != lastI) {
            logger("twincat", "startWritingToDatabase", "info", "Writing to database");

            this.database.push({
              F: currentF,
              D: currentD,
              I: currentI,
            });

            fs.writeFileSync(
              "./database.json",
              JSON.stringify(this.database)
            );
          }
        })
        .catch((err) => {
          console.log(logger("twincat", "startWritingToDatabase", "error", err));
        });

      // Check if last DB values are different from current DB values
    }, 1000); // TODO:  set to 100ms
  },

  // Will read all input and output values from Twincat
  async readAllValues() {
    console.log("Reading all values...\n");
    let readObj = {};

    await Promise.all([
      this.client.readSymbol("GVL_OutputHMI.rCurrentLive"),
      this.client.readSymbol("GVL_OutputHMI.rVoltageLive"),
      this.client.readSymbol("GVL_OutputHMI.rCurrentLast"),
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

      this.client.readSymbol("GVL_InputHMI.bDistanceSensorNulling"),
      this.client.readSymbol("GVL_InputHMI.bDistanceSensorNullingPlateRemoved"),
    ])
      .then((response) => {
        readObj.success = true;

        for (let element of response) {
          readObj[`${element.symbol.name}`] = element.value;
        }
      })
      .catch((err) => {
        console.log(err);

        readObj.success = false;
        readObj.errorMessage = err;
      });

    return readObj;
  },

  // write arbitrary prepared object to Runtime
  async writeToPlc(
    writeObj
  ) {
    console.log("Writing values to PLC... \n");

    let readObj = {};
    let promises = [];

    for(let key in writeObj) {
      promises.push(this.client.writeSymbol(key, writeObj[key]));
    }

    await Promise.all(promises)
      .then((response) => {
        logger("twincat", "writeToPlc", "info", "Writting to PLC was successful");

        readObj.success = true;
      })
      .catch((err) => {
        console.log(err);
        logger("twincat", "writeToPlc", "error", err);

        readObj.success = false;
        readObj.errorMessage = err;
      });

    return readObj;
  },
};

async function main() {
  // await plcManager.connectToPlc();

  // let resp = await plcManager.writeNullifyDistance(true);
  /* await plcManager.writeStartTest(
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
  await plcManager.disconnectPlc();  */

  await plcManager.loadDatabase();
  await plcManager.connectToPlc();
  await plcManager.getPlcStatus();
  let resp = await plcManager.readAllValues(); 
  plcManager.startWritingToDatabase();

  console.log(JSON.stringify(resp))
}

// main(); //  causes run in the same port

module.exports = { plcManager };
