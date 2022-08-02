import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { Application, Request, Response } from "express";
// import { connectToTwincat } from "./twincat.js";

const app: Application = express();

app.use(bodyParser.urlencoded({ extended: true }));
const port: number = 80;

app.use(
  "/",
  express.static(
    "C:\\Users\\User\\Documents\\GitHub\\beckhoff-server-frontend\\svelte-encrypted-spa\\build"
  )
);
// app.use("/", connectToTwincat);
app.get("/", (req: Request, res: Response) =>
  res.sendFile(
    "C:\\Users\\User\\Documents\\GitHub\\beckhoff-server-frontend\\svelte-encrypted-spa\\build\\index.html"
  )
);

app.listen(port, () => {
  console.log("Example app listening on port " + port);
});
