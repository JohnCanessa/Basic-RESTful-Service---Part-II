/*
 * create custom logging (middleware function)
 */
function log(req, res, next) {
  // **** simulate some type of logging operation ****
  console.log("logging...");

  // **** pass control to the next middleware function ****
  next();
}

// **** export function ****
module.exports = log;
