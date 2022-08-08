import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { Application, Request, Response } from "express";
import { plcManager } from "./twincat.js";

const app: Application = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port: number = 80;

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
app.post("/api/connect", (req: Request, res: Response) => {
  plcManager.connectToPlc();

  req.socket.end();
});

// api endpoint for disconnecting from system
app.post("/api/disconnect", (req: Request, res: Response) => {
  console.log(req.body);

  req.socket.end();
});

// api endpoint for getting status of plc
app.get("/api/status", (req: Request, res: Response) => {
  console.log(req.body);

  req.socket.end();
});

// api endpoint for reading all inputs/outputs
app.get("/api/read", (req: Request, res: Response) => {
  req.socket.end();
});

// api endpoint for writing to motor only
app.post("/api/writeMotor", (req: Request, res: Response) => {
  console.log(req.body);

  req.socket.end();
});

// api endpoint to start/stop test
app.post("/api/writeTest", async (req: Request, res: Response) => {
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

  let plcResponse = await plcManager.writeStartTest(
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

  res.json(plcResponse);
});

app.listen(port, () => {
  console.log("Example app listening on port " + port);
});
