const jwt = require("jsonwebtoken");
const jwtSecret = process?.env?.JWT_SECRET || "oTHeR#SecReT";
const UsersModel = require("../Models/MD/Users.schema");
const UsersMD = require("../Models/SQL/Users.sql");

module.exports.verifyRequest = (req, res, next) => {
  const token = req?.header("auth-token");
  if (!token) return res?.status(401)?.send("Access Denied");

  try {
    const verified = jwt.verify(token, jwtSecret);

    if (!verified || !verified?.user?.id) {
      return res?.status(401)?.send("Access Denied! Please re-login and try again.");
    }

    req.userId = verified?.id;
    req.userEmail = verified?.email;

    next();
  } catch (err) {
    res?.status(400)?.send("Invalid Token");
  }
};

module.exports.verifyAdmin = async (req, res, next) => {
  const token = req?.header("auth-token");
  if (!token) return res?.status(401)?.send("Access Denied");

  try {
    const verified = jwt.verify(token, jwtSecret);
    const user = verified?.user || {};
    console.log({user})
    let dbRes = null;
    if (process.env.DB_POOL == "SQL") {
      const dbResponse = await UsersMD.findOne({
        where: {
          id:user?.id, 
          email: user?.email
        },
      });
      dbRes = dbResponse?.toJSON() || null;

      if (!dbRes) {
        return res?.status(401)?.send("Access Denied! You are not authorized user.");
      }
    } else {
      dbRes = await UsersModel.findOne({ _id: user?.id, email: user?.email, role: "ADMIN" }).select("_id email role");
    }
    if (!dbRes) {
      return res?.status(401)?.send("Access Denied! You are not authorized user.");
    }

    req.userId = dbRes?._id;
    req.userEmail = dbRes?.email;

    next();
  } catch (err) {
    res?.status(400)?.send("Invalid Token");
  }
};

// Function to generate JWT token
module.exports.generateToken = (param) => {
  const payload = {
    user: param,
  };

  const options = {
    expiresIn: "1h", // Token expiration time
  };

  // Create and return the token
  const token = jwt.sign(payload, jwtSecret, options);
  return token;
};
