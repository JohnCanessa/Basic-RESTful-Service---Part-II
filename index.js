// **** load express framework ****
const express = require("express");

// **** for morgan logger [a] ****
const fs = require("fs");

// **** local configuration module ****
const config = require("config");

// **** locad helmet module ****
const helmet = require("helmet");

// **** for validations (returns a class)****
const Joi = require("joi");

// **** set debug function(s) (typically one per module) ****
const debug = require("debug")("app:startup");

// **** morgan logger [b] ****
const morgan = require("morgan");

// **** for morgan to log to a file [c] ****
const path = require("path");

// **** our custom logging ****
const logger = require("./middleware/logger.js");

// **** our custom authentication ****
const authenticate = require("./middleware/authenticate");

// **** home route ****
const home = require("./routes/home");

// **** patient routes ****
const patients = require("./routes/patients");

// **** study routes ****
const studies = require("./routes/studies");

// **** create express application (server) ****
const app = express();

// **** set the template engine to use in this app (e.g., pug) ****
app.set("view engine", "pug");

// **** location of templates (default is: ./views) ****
app.set("views", "./views");

// **** display our environment ****
console.log(`      NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app.get('env'): ${app.get("env")}`);

// **** display our configuration ****
console.log(`Application Name: ${config.get("name")}`);
if (config.has("mail.host"))
  console.log(`     Mail Server: ${config.get("mail.host")}`);

if (config.has("mail.port"))
  console.log(`       Mail Port: ${config.get("mail.port")}`);

if (config.has("mail.password"))
  console.log(`   Mail Password: ${config.get("mail.password")}`);

// **** enable logging (if in development) ****
if (app.get("env") === "development") {
  // **** create a write stream (in append mode) [d] ****
  const serverLogStream = fs.createWriteStream(
    path.join("./logs", "server.log"),
    {
      flags: "a"
    }
  );

  // **** setup the logger using a predefined format: tiny, short, dev, common, combined [e] ****
  app.use(morgan("common", { stream: serverLogStream }));

  // ???? inform the user what is going on ????
  // console.log("Morgan enabled...");
  debug("Morgan enabled...");
}

// **** enable parsing of JSON objects by express (populates req.body) ****
app.use(express.json());

// **** parses incoming requests with urlencoded payloads (e.g., key=value&key=value) (populates req.body)
//      traditional approach; not use often ****
app.use(express.urlencoded({ extended: true }));

// **** serve static content from the specified folder (e.g., localhost:4444/readme.txt) ****
app.use(express.static("public"));

// **** enable helmet (middleware) ****
app.use(helmet());

// **** for any route like this, use this router ****
app.use("/", home);

// **** for any route like this, use this router ****
app.use("/api/patients", patients);

// **** for any route like this, use this router ****
app.use("/api/studies", studies);

// **** define the port to listen on ****
const port = process.env.STORAGE_SERVER_PORT || 4444;

// **** listen for requests ****
app.listen(port, () => {
  console.log(`storage server listening on port:  ${port} ...`);
});
