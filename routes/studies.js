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
 * route and handler (studies per date)
 */
router.get("/date/:year/:month/:day", (req, res) => {
  // **** for ease of use ****
  const year = req.params.year;
  const month = req.params.month;
  const day = req.params.day;

  // ???? display request parameters ????
  console.log(`year: ${year} month: ${month} day: ${day}`);

  // **** send response ****
  res.send(req.params);
});

// ***** export the router ****
module.exports = router;
