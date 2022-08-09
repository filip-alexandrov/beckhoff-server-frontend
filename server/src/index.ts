import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { Application, Request, Response } from "express";
import { plcManager } from "./twincat.js";

const app: Application = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port: number = 6328;

// serve assets, images, css, fonts, etc.
app.use(
  "/",
  express.static(
    "C:\\Users\\User\\Documents\\GitHub\\beckhoff-server-frontend\\svelte-encrypted-spa\\build"
  )
);

// serve website
app.get("/", (req: Request, res: Response) =>
  res.sendFile(
    "C:\\Users\\User\\Documents\\GitHub\\beckhoff-server-frontend\\svelte-encrypted-spa\\build\\index.html"
  )
);

// api endpoint for connecting to system
app.post("/api/connectToPlc", async (req: Request, res: Response) => {
  let tcResp = await plcManager.connectToPlc();

  res.json(tcResp);
});

// api endpoint for disconnecting from system
app.post("/api/disconnectPlc", async (req: Request, res: Response) => {
  let tcResp = await plcManager.disconnectPlc();

  res.json(tcResp);
});

// api endpoint for getting status of plc
app.get("/api/getPlcStatus", async (req: Request, res: Response) => {
  let tcResp = await plcManager.getPlcStatus();

  res.json(tcResp);
});

// api endpoint for reading all inputs/outputs
app.get("/api/readAll", async (req: Request, res: Response) => {
  let tcResp = await plcManager.readAllValues();

  res.json(tcResp);
});

// api endpoint for writing to motor only
app.post("/api/writeManualMotor", async (req: Request, res: Response) => {
  let { bManualMoveMotor, rManualMotorPosition, rManualMotorVelocity } =
    req.body;

  let tcResp = await plcManager.writeManualMotor(
    bManualMoveMotor,
    rManualMotorPosition,
    rManualMotorVelocity
  );

  res.json(tcResp);
});

// api endpoint for nullifying distance sensors
app.post("/api/writeNullifyDistance", async (req: Request, res: Response) => {
  let { bDistanceSensorNulling } =
    req.body;

  let tcResp = await plcManager.writeNullifyDistance(
    bDistanceSensorNulling
  );

  res.json(tcResp);
});

// api endpoint to start/stop test
app.post("/api/writeStartTest", async (req: Request, res: Response) => {
  let {
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
  } = req.body;

  let tcResp = await plcManager.writeStartTest(
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
  );

  res.json(tcResp);
});

app.listen(port, () => {
  console.log("Example app listening on port " + port);
});
