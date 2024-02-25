const Users = require("../../Models/SQL/Users.sql");
const Grocery = require("../../Models/SQL/Grocery.sql");
const Cart = require("../../Models/SQL/Cart.sql");

const updateUser = async (id, input) => {
  try {
    const dbResponse = await Users.findByPk(parseInt(id));
    console.log({dbResponse})
    if (!dbResponse) {
      return { code: -2, message: "Fail to user for update.", data: null };
    }
    console.log({input})
    const updateRes = await dbResponse.update(input);

    const _res = updateRes?updateRes?.toJSON():null;

    return { code: 1, message: "Success", data: _res };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getUsers = async (id) => {
  try {
    let q = {};

    if (id && id != "") {
      q = {where: { id: parseInt(id) }};;
    }
    const dbResponse = await Users.findAll(q, {
      include: [{
        model: Cart,
        include: [Grocery]
      }]
    });

    const _res = dbResponse?dbResponse.map(item => item.toJSON()) : null;
    if (!_res) {
      return { code: -2, message: "Fail to get users.", data: null };
    }
    return { code: 1, message: "Success", data: _res };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getUserCart = async (id) => {
  try {
    const dbResponse = await Users.findByPk(id, {
      include: {
        model: Cart,
        attributes: ["id", "quantity"],
      },
    });

    if (!dbResponse) {
      return { code: -2, message: "Fail to add get cart.", data: null };
    }
    return { code: 1, message: "Success", data: dbResponse };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const addToCart = async (id, products) => {
  try {
    const dbUserResponse = await Users.findByPk(id);

    const oldCart = dbUserResponse?.toJSON() || null;

    if (!oldCart) {
      return { code: -2, message: "No user found.", data: null };
    }
    // Check for existing products in cart and update quantities

    for (const grocery of products) {
      const { product, quantity } = grocery;

      const groceryItem = await Grocery.findByPk(product);
      if (!groceryItem) {
        console.log(`Grocery item with ID ${product} not found.`);
        continue; 
      }
      // Create a new Cart item and associate with user and grocery
      await Cart.create({
        quantity: quantity,
        UserId: id, 
        GroceryId: product, 
      });
    }

    return { code: 1, message: "Success", data: null };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = { updateUser, getUsers, getUserCart, addToCart };
