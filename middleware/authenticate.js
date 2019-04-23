/*
 * create custom authentication (middleware function)
 */
function authenticate(req, res, next) {
  // **** simulate some type of authentication operation ****
  console.log("authenticating...");

  // **** pass control to the next middleware function ****
  next();
}

// **** export function ****
module.exports = authenticate;
