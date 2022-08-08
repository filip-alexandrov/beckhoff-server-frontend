"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const twincat_js_1 = require("./twincat.js");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
const port = 80;
// serve assets, images, css, fonts, etc.
app.use("/", express_1.default.static("C:\\Users\\User\\Documents\\GitHub\\beckhoff-server-frontend\\svelte-encrypted-spa\\build"));
// serve website
app.get("/", (req, res) => res.sendFile("C:\\Users\\User\\Documents\\GitHub\\beckhoff-server-frontend\\svelte-encrypted-spa\\build\\index.html"));
// api endpoint for connecting to system
app.post("/api/connect", (req, res) => {
    twincat_js_1.plcManager.connectToPlc();
    req.socket.end();
});
// api endpoint for disconnecting from system
app.post("/api/disconnect", (req, res) => {
    console.log(req.body);
    req.socket.end();
});
// api endpoint for reading all inputs/outputs
app.get("/api/read", (req, res) => {
    req.socket.end();
});
// api endpoint for writing to motor only
app.post("/api/writeMotor", (req, res) => {
    console.log(req.body);
    req.socket.end();
});
// api endpoint to start/stop test
app.post("/api/writeTest", (req, res) => {
    let { e_OperationMode, rMinCurrent, rMaxCurrent, rCurrentStep, rMinAirgap, rMaxAirgap, rAirgapStep, bStartButton, bEmergencyStop, sCSVName, tWaitBeforeMeasurement, bPause, } = req.body;
    twincat_js_1.plcManager.writeStartTest(e_OperationMode, rMinCurrent, rMaxCurrent, rCurrentStep, rMinAirgap, rMaxAirgap, rAirgapStep, bStartButton, bEmergencyStop, sCSVName, tWaitBeforeMeasurement, bPause);
    req.socket.end();
});
app.listen(port, () => {
    console.log("Example app listening on port " + port);
});
