const sendOTP = require("../services/sendOTP");
const generateOTP = require("../utils/generateOTP");

module.exports = async function (req, res) {
  const nickname = req.body.nickname;
  const email = req.body.email;

  if (!nickname) {
    return res.status(400).send({
      error: "invalid_request",
      error_description: "nickname is required",
    });
  }

  if (!email) {
    return res.status(400).send({
      error: "invalid_request",
      error_description: "email is required",
    });
  }

  const otp = generateOTP();

  try {
    await sendOTP(email, otp);

    req.session.otp = { nickname, email, password: otp };

    res.sendStatus(201);
  } catch (error) {
    console.error(error);

    return res.sendStatus(500);
  }
};
