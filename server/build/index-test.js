"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose_1 = require("mongoose");
const path = require("path");
const serveIndex = require("serve-index");
const app = express();
const port = 5057;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/user=:user/pass=:pass", (req, res, next) => {
    console.log("User ", req.params.user);
    console.log("Pass ", req.params.pass);
    let user = req.params.user;
    let pass = req.params.pass;
    if (user !== "fil" || pass !== "000") {
        throw Error("Invalid user or password");
    }
    console.log(req.cookies["myAuthCookie"]);
    res.cookie("myAuthCookie", "12345", {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
    });
    /* res.setHeader("Cookie", "user=fil; pass=000"); */
    next();
});
app.use("/:user/:pass", express.static("C:\\Users\\User\\Documents\\GitHub"), serveIndex("C:\\Users\\User\\Documents\\GitHub", { icons: true }));
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));
app.listen(port, () => {
    console.log("Example app listening on port " + port);
});
let config = {
    url: "mongodb://localhost:27017/food",
    user: "user1",
    pwd: "pass1",
};
(0, mongoose_1.connect)(config.url, {
    user: config.user,
    pass: config.pwd,
})
    .then(() => {
    console.log("Connected to MongoDB");
})
    .catch((err) => {
    console.log("Error connecting to MongoDB");
    console.log(err);
});
