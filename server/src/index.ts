import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { Application, Request, Response } from "express";
import { plcManager } from "./twincat";

const app: Application = express();

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
const port: number = 80;

// serve assets, images, css, fonts, etc. 
app.use(
  "/",
  express.static(
    "C:\\Users\\User\\Documents\\GitHub\\beckhoff-server-frontend\\svelte-encrypted-spa\\build"
  )
);

// app.use("/", connectToTwincat);

// serve website 
app.get("/", (req: Request, res: Response) =>
  res.sendFile(
    "C:\\Users\\User\\Documents\\GitHub\\beckhoff-server-frontend\\svelte-encrypted-spa\\build\\index.html"
  )
);

// api endpoint for connecting to system 
app.post("/api/connect", (req: Request, res: Response) => {
    console.log(req.body)

    req.socket.end()
})

// api endpoint for disconnecting from system 
app.post("/api/disconnect", (req: Request, res: Response) => {
    console.log(req.body)

    req.socket.end()
})


// api endpoint for reading all inputs/outputs
app.get("/api/read", (req: Request, res: Response) => {
    

    req.socket.end()
})

// api endpoint for writing to motor only
app.post("/api/writeMotor", (req: Request, res: Response) => {
    console.log(req.body)

    req.socket.end()
})

// api endpoint to start/stop test
app.post("/api/writeTest", (req: Request, res: Response) => {
    console.log(req.body)

    req.socket.end()
})

app.listen(port, () => {
  console.log("Example app listening on port " + port);
});
