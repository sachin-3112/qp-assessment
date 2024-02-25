const { INTEGER } = require("sequelize");
const GroceryModel = require("../../Models/SQL/Grocery.sql");

const addProduct = async (input) => {
  try {
    const userData = await (await GroceryModel.create({ ...input })).save();
    const _res = userData?.toJSON() || null;
    if (!_res) {
      return { code: -2, message: "Fail to add product.", data: null };
    }
    return { code: 1, message: "Success", data: userData?.id };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateProduct = async (id, input) => {
  try {
    const dbResponse = await GroceryModel.findByPk(id);
    if (!dbResponse) {
      return { code: -2, message: "Fail to update product.", data: null };
    }

    const updateRes = await dbResponse.update(input);

    const _res = updateRes?.toJSON() || null;

    return { code: 1, message: "Success", data: _res };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getProducts = async (id) => {
  try {
    let q = {};

    if (id && id != "") {
      q = {where: { id: parseInt(id) }};
    }
    console.log({q})
    const dbResponse = await GroceryModel.findAll(q);
    
    const _res = dbResponse?dbResponse.map(item => item.toJSON()) : null;
    if (!_res) {
      return { code: -2, message: "Fail to get product.", data: null };
    }
    return { code: 1, message: "Success", data: _res };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteProducts = async (id) => {
  try {
    const userData = await GroceryModel.findByPk(id);

    if (!userData) {
      return { code: -2, message: "Fail to delete product.", data: null };
    }
    const delRes = await userData.destroy();

    const _res = delRes? delRes?.toJSON() : null;
    return { code: 1, message: "Success", data: _res };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = { addProduct, updateProduct, getProducts, deleteProducts };
