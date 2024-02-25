const MongoFn = require("../Functions/MongoDB/Users.mongo");
const SqlFn = require("../Functions/SqlDB/Users.sql");

module.exports.updateUser = async (req, res, next) => {
  try {
    const { firstName, lastName, mobile, email, country } = req.body;

    if (!firstName || !lastName || !mobile ) {
      console.info("Invalid inputs....");
      return res
        .status(400)
        .json({ code: -1, message: "Invalid inputs! Please pass the correct payload.", data: null });
    }

    delete req.body?._id;

    const fnRes =
      process.env.DB_POOL == "SQL"
        ? await SqlFn.updateUser(req.params?.id, { ...req.body })
        : await MongoFn.updateUser(req.params?.id, { ...req.body });

        console.log({fnRes})
    if (fnRes.code == -2) {
      return res.status(404).json({ code: -2, message: "Fail to update.", data: null });
    }
    return res.status(200).json(fnRes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ code: -99, message: error?.message });
    next(error);
  }
};

module.exports.getUsers = async (req, res, next) => {
  try {
    const id = req.query?.id;

    const fnRes = process.env.DB_POOL == "SQL" ? await SqlFn.getUsers(id || null) : await MongoFn.getUsers(id || null);

    if (fnRes.code == -2) {
      return res.status(404).json({ code: -2, message: "No user(s) available.", data: null });
    }
    return res.status(200).json(fnRes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ code: -99, message: error?.message });
    next(error);
  }
};

module.exports.getUserCart = async (req, res, next) => {
  try {
    const { id } = req.params;

    const fnRes = process.env.DB_POOL == "SQL" ? await SqlFn.getUserCart(id) : await MongoFn.getUserCart(id);

    if (fnRes.code == -2) {
      return res.status(404).json({ code: -2, message: "No user(s) available.", data: null });
    }
    return res.status(200).json(fnRes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ code: -99, message: error?.message });
    next(error);
  }
};

module.exports.addToCart = async (req, res, next) => {
  try {
    const { products } = req.body;

    if (!products || !Array.isArray(products) || products?.length <= 0) {
      console.info("Invalid inputs....");
      return res.status(400).json({ code: -1, message: "Invalid inputs! Please select the products.", data: null });
    }

    const fnRes =
      process.env.DB_POOL == "SQL"
        ? await SqlFn.addToCart(req.params.id, products )
        : await MongoFn.addToCart(req.params.id, products );

    if (fnRes.code == -2) {
      return res.status(404).json({ code: -2, message: "Fail to add in cart.", data: null });
    }
    return res.status(200).json(fnRes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ code: -99, message: error?.message });
    next(error);
  }
};
