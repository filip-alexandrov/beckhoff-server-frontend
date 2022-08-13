const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const port = 80;

app.get("/api", (req, res) => {
  res.json({ message: "Hello World!" });
});


app.listen(port, () => {
    console.log("Example app listening on port " + port);
  });
  