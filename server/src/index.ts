import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { Application, Request, Response } from "express";
import { plcManager } from "./twincat.js";
import cors from "cors";

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
app.use(cors());

// serve website
app.get("/", (req: Request, res: Response) =>
  res.sendFile(
    "C:\\Users\\User\\Documents\\GitHub\\beckhoff-server-frontend\\svelte-encrypted-spa\\build\\index.html"
  )
);

// api endpoint for connecting to system
app.post("/api/connectToPlc", async (req: Request, res: Response) => {
  console.log("Connecting to PLC...")
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
app.get("/api", async (req: Request, res: Response) => {
  let tcResp = await plcManager.readAllValues();

  res.json(tcResp);
});

// api endpoint to write arbitrary object of values to plc
app.post("/api", async (req: Request, res: Response) => {
  let tcResp = await plcManager.writeToPlc(req.body);

  res.json(tcResp);
});

app.listen(port, () => {
  console.log("Example app listening on port " + port);
});
