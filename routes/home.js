// **** load express framework ****
const express = require("express");

// **** use router ****
const router = express.Router();

// **** for our custom logging ****
const logger = require("../middleware/logger.js");

// **** for our custom authentication ****
const authenticate = require("../middleware/authenticate.js");

// **** enable our logger middleware ****
router.use(logger);

// **** enable our authentication middleware ****
router.use(authenticate);

/*
 * route and handler (check if alive)
 */
router.get("", (req, res) => {
  // **** send simple text message ****
  // res.send("storage server is up and running!!!");

  // **** render back HTML page ****
  res.render("index", {
    title: "Storage Server",
    message: "storage server is up and running!!!"
  });
});

// ***** export the router ****
module.exports = router;
