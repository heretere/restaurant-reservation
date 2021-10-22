const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const express = require("express");
const cors = require("cors");

const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/reservations", require("./reservations/reservations.router"));
app.use("/tables", require("./tables/tables.router.js"));

app.use(notFound);
app.use(errorHandler);

module.exports = app;
