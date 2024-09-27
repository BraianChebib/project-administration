const express = require("express");
const MainRouter = require("./routes/index");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(MainRouter);

module.exports = app;
