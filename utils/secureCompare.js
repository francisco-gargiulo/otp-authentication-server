const crypto = require("crypto");

module.exports = function secureCompare(value1, value2) {
  // Use the crypto module to create a SHA256 hash of the values
  const hash1 = crypto.createHash("sha256").update(value1).digest();
  const hash2 = crypto.createHash("sha256").update(value2).digest();

  // Use the crypto.timingSafeEqual() function to compare the hashes
  return crypto.timingSafeEqual(hash1, hash2);
};
