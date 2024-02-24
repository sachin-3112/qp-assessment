const jwt = require('jsonwebtoken');
const jwtSecret= process?.env?.JWT_SECRET || "oTHeR#SecReT";

module.exports.verifyRequest = (req, res, next) => {
  const token = req?.header('auth-token');
  if (!token) return res?.status(401)?.send('Access Denied');

  try {
    const verified = jwt.verify(token, jwtSecret);
    req.user = verified;
    next();
  } catch (err) {
    res?.status(400)?.send('Invalid Token');
  }
};