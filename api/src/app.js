const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 3003;
const { conn } = require("./db.js");
const routes = require("./routes/index");
const app = express();
const cors = require('cors');

conn.sync({ force: false }).then(() => {
  // Log requests to the console.
  app.use(logger("dev"));
  app.use(express.json());
  app.use(cors());
  app.use("/", routes);
  app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));
  app.listen(port, () => {
    console.log(`servidor corriendo en el puerto: ${port}`);
    app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
      res.header("Access-Control-Allow-Credentials", "true");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      next();
    });
  });

  // Setup a default catch-all route that sends back a welcome message in JSON format.
});

module.exports = app;