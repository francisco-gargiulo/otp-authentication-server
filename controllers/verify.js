const secureCompare = require("../utils/secureCompare");
const generateSub = require("../utils/generateSub");

module.exports = async function ({ body: { password }, session }, res) {
  if (!session.otp) {
    return res.sendStatus(403);
  }

  if (!password) {
    return res.status(400).json({ error: "invalid_request" });
  }

  if (!secureCompare(session.otp.password, password)) {
    if (!session.otp.retry) {
      session.otp.retry = 1;
    } else {
      session.otp.retry += 1;
    }

    if (session.otp.retry > 3) {
      session.destroy();

      return res.sendStatus(403);
    }

    return res.sendStatus(401);
  }

  session.user = {
    sub: generateSub(session.otp.email),
    email: session.otp.email,
    nickname: session.otp.nickname,
  };

  delete session.otp;

  await session.save();

  res.header("Cache-Control", "no-store");
  res.header("Pragma", "no-cache");

  res.sendStatus(200);
};
