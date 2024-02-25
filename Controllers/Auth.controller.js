const { generateToken } = require("../Middleware/authMiddleware");
const MongoFn = require("../Functions/MongoDB/Auth.mongo");
const SqlFn = require("../Functions/SqlDB/Auth.sql");

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      console.info("Invalid inputs....");
      return res
        .status(400)
        .json({ code: -1, message: "Invalid inputs! Please pass the correct payload.", data: null });
    }

    const fnRes = 
    process.env.DB_POOL == "SQL"
      ? await SqlFn.login({ ...req.body })
      : await MongoFn.login({ ...req.body });

    if (fnRes.code == -2) {
      return res
        .status(404)
        .json({ code: -2, message: "No user found with provided username and password.", data: null });
    }

    
    let userAccessToken = await generateToken({ id: fnRes?.data?._id || fnRes?.data?.id, email: fnRes?.data?.email });

    res
      .status(200)
      .json({ code: fnRes.code, message: "Success", data: { usersData: fnRes?.data, token: userAccessToken } });

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ code: -99, message: error?.message });
    next(error);
  }
};

module.exports.create = async (req, res, next) => {
  try {
    const { firstName, lastName, mobile, email, password, country } = req.body;

    if (!firstName || !lastName || !mobile || !email || !password) {
      console.info("Invalid inputs....");
      return res
        .status(400)
        .json({ code: -1, message: "Invalid inputs! Please pass the correct payload.", data: null });
    }

    const fnRes =
      process.env.DB_POOL == "SQL"
        ? await SqlFn.createUser({ ...req.body })
        : await MongoFn.createUser({ ...req.body });

        console.log({fnRes});

    if (fnRes.code == -2) {
      return res.status(404).json({ code: -2, message: "Fail to create account.", data: null });
    } 

   return  res.status(200).json(fnRes);

  } catch (error) {
    console.error(error);
    res.status(500).json({ code: -99, message: error?.message });
    next(error);
  }
};

module.exports.createAdmin = async (req, res, next) => {
  try {
    const { firstName, lastName, mobile, email, password, country } = req.body;

    if (!firstName || !lastName || !mobile || !email || !password) {
      console.info("Invalid inputs....");
      return res
        .status(400)
        .json({ code: -1, message: "Invalid inputs! Please pass the correct payload.", data: null });
    }

    const fnRes =
    process.env.DB_POOL == "SQL"
      ? await SqlFn.createAdmin({ ...req.body })
      :  await MongoFn.createAdmin({ ...req.body });

    if (fnRes.code == -2) {
      return res.status(404).json({ code: -2, message: "Fail to create account.", data: null });
    }
    res.status(200).json({ code: 1, message: "Success", data: fnRes?.data?._id });

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ code: -99, message: error?.message });
    next(error);
  }
};
