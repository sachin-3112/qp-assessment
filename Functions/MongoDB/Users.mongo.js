const UsersModel = require("../../Models/MD/Users.schema");
const GroceryModel = require("../../Models/MD/Grocery.schema");

const updateUser = async (id,input) => {
    try {
     
    const dbResponse = await UsersModel.findOneAndUpdate(
        {
          _id: id,
        },
        { ...input },
        {
          returnDocument: "after",
        }
      ).select("-password");
  
      if (!dbResponse) {
        return { code: -2, message: "Fail to delete product.", data: null };
      }
      return { code: 1, message: "Success", data: dbResponse._doc };
    } catch (error) {
      console.log(error);
      return { code: -99, message: error?.message };
    }
  };

  const getUsers = async (id) => {
    try {
        let q = {};

        if (id && id != "") {
          q = { _id: id };
        }
        const dbResponse = await UsersModel.find(q).select("-password").populate("cart.product");
    
      if (!dbResponse) {
        return { code: -2, message: "Fail to get users.", data: null };
      }
      return { code: 1, message: "Success", data: dbResponse };
    } catch (error) {
      console.log(error);
      return { code: -99, message: error?.message };
    }
  };

  const getUserCart = async (id) => {
    try {
      
    const dbResponse = await UsersModel.findOne({ _id: id }).select("_id cart").populate("cart.product");

  
      if (!dbResponse) {
        return { code: -2, message: "Fail to add get cart.", data: null };
      }
      return { code: 1, message: "Success", data: dbResponse };
    } catch (error) {
      console.log(error);
      return { code: -99, message: error?.message };
    }
  };

  const addToCart = async (id,products) => {
    try {

        
    const dbUserResponse = await UsersModel.findOne({ _id: id }).select("-password");

    const oldCart = dbUserResponse?._doc;
    // Check for existing products in cart and update quantities
    products.forEach((newProduct) => {
      const existingProductIndex = oldCart.cart.findIndex((cartItem) => cartItem.product == newProduct.product);

      if (existingProductIndex !== -1) {
        // If product already exists, update quantity
        oldCart.cart[existingProductIndex].quantity += newProduct.quantity;
      } else {
        // If product does not exist, push it to the cart
        oldCart.cart.push(newProduct);
      }
    });

    dbUserResponse._doc = oldCart
    const dbResponse = await dbUserResponse.save();

      if (!dbResponse) {
        return { code: -2, message: "Fail to add product in cart.", data: null };
      }
      return { code: 1, message: "Success", data: dbResponse?._doc };
    } catch (error) {
      console.log(error);
      return { code: -99, message: error?.message };
    }
  };

  module.exports = { updateUser, getUsers, getUserCart,addToCart };