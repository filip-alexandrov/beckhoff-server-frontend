const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");

const port = process.env.PORT || 80;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// middleware, use different file
app.use("/api/goals", require("./routes/goalRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
