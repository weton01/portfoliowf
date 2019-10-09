"use strict";

const app = require("./bin/express");
const variables = require("./bin/configuration/variables");

app.listen(process.env.PORT, "0.0.0.0");
