const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Routers
const userRouter = require("../routes/user.route");
const careerRouter = require("../routes/career-route");
const formationRouter = require("../routes/formation-route");
const certificationRoute = require("../routes/certification-route");

// Variaveis
const variables = require("./configuration/variables");

// Aplicação
const app = express();

// Json e Cors
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Conectando
mongoose.connect(variables.Database.connection, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use("/api/user", userRouter);
app.use("/api/career", careerRouter);
app.use("/api/formation", formationRouter);
app.use("/api/certification", certificationRoute);

module.exports = app;
