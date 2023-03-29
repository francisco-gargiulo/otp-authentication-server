const crypto = require("crypto");

module.exports = function generateSub(text) {
  return crypto
    .createHash("sha256")
    .update(text)
    .digest("hex")
    .toString()
    .slice(0, 32);
};
