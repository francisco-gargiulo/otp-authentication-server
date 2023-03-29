const crypto = require("crypto");

// Define the maximum number of digits for the OTP
const MAX_DIGITS = 4;

// Export a function that generates a random OTP with the specified number of digits
module.exports = function generateOTP() {
  // Generate a random 4-digit number
  const otp = Math.floor(Math.random() * 10000);

  // Pad the number with leading zeros if necessary
  const paddedOtp = otp.toString().padStart(MAX_DIGITS, "0");

  // Convert the padded number to a number type
  const otpNumber = Number(paddedOtp);

  // Convert the number to a buffer
  const otpBuffer = Buffer.allocUnsafe(2);
  otpBuffer.writeUInt16BE(otpNumber, 0);

  // Use the crypto module to create a SHA256 hash of the buffer
  const hash = crypto.createHash("sha256").update(otpBuffer).digest("hex");

  // Return the first 4 characters of the hash as the OTP
  return `${parseInt(hash.slice(0, MAX_DIGITS), 16) % 10000}`;
};
