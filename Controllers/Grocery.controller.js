const MongoFn = require("../Functions/MongoDB/Grocery.mongo");
const SqlFn = require("../Functions/SqlDB/Grocery.sql");

module.exports.addProduct = async (req, res, next) => {
  try {
    const { name, price } = req.body;

    if (!name || !price) {
      console.info("Invalid inputs....");
      return res
        .status(400)
        .json({ code: -1, message: "Invalid inputs! Please pass the correct payload.", data: null });
    }

    const fnRes =
      process.env.DB_POOL == "SQL"
        ? await SqlFn.addProduct({ ...req.body })
        : await MongoFn.addProduct({ ...req.body });

    if (fnRes.code == -2) {
      return res.status(404).json({ code: -2, message: "Fail to add product.", data: null });
    }
    return res.status(200).json(fnRes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ code: -99, message: error?.message });
    next(error);
  }
};

module.exports.updateProduct = async (req, res, next) => {
  try {
    if (!req.body || typeof req.body != "object") {
      console.info("Invalid inputs....");
      return res
        .status(400)
        .json({ code: -1, message: "Invalid inputs! Please pass the correct payload.", data: null });
    }

    const fnRes =
      process.env.DB_POOL == "SQL"
        ? await SqlFn.updateProduct(req.params.id || null, { ...req.body })
        : await MongoFn.updateProduct(req.params.id || null, { ...req.body });

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

module.exports.getProducts = async (req, res, next) => {
  try {
    const fnRes =
      process.env.DB_POOL == "SQL"
        ? await SqlFn.getProducts(req?.query?.id || null)
        : await MongoFn.getProducts(req?.query?.id || null);

    if (fnRes.code == -2) {
      return res.status(404).json({ code: -2, message: "No products available.", data: null });
    }
    return res.status(200).json(fnRes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ code: -99, message: error?.message });
    next(error);
  }
};

module.exports.deleteProducts = async (req, res, next) => {
  try {
    const { id } = req.params;

    const fnRes = process.env.DB_POOL == "SQL" ? await SqlFn.deleteProducts(id) : await MongoFn.deleteProducts(id);

    if (fnRes.code == -2) {
      return res.status(404).json({ code: -2, message: "No products available.", data: null });
    }
    return res.status(200).json(fnRes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ code: -99, message: error?.message });
    next(error);
  }
};
