const GroceryModel = require("../../Models/MD/Grocery.schema");

const addProduct = async (input) => {
    try {
      const userData = await (await GroceryModel.create({...input})).save();
  
      if (!userData) {
        return { code: -2, message: "Fail to add product.", data: null };
      }
      return { code: 1, message: "Success", data: userData?._id };
    } catch (error) {
      console.log(error);
      return { code: -99, message: error?.message };
    }
  };
  
  const updateProduct = async (id,input) => {
    try {
      const dbResponse = await GroceryModel.findOneAndUpdate({
        _id:id
    },{...input},{
      returnDocument:'after'
    });
  
      if (!dbResponse) {
        return { code: -2, message: "Fail to update product.", data: null };
      }
      return { code: 1, message: "Success", data: dbResponse?._id };
    } catch (error) {
      console.log(error);
      return { code: -99, message: error?.message };
    }
  };
  
  
  const getProducts = async (id) => {
    try {
        
        let q = {};

        if(id && id != ""){
            q = {_id:id};
        }
        const dbResponse =await GroceryModel.find(q);

      if (!dbResponse) {
        return { code: -2, message: "Fail to get product.", data: null };
      }
      return { code: 1, message: "Success", data: dbResponse?._id };
    } catch (error) {
      console.log(error);
      return { code: -99, message: error?.message };
    }
  };
  
  
  const deleteProducts = async (id) => {
    try {
      const userData = await GroceryModel.findOneAndDelete({_id:id});
  
      if (!userData) {
        return { code: -2, message: "Fail to delete product.", data: null };
      }
      return { code: 1, message: "Success", data: userData?._id };
    } catch (error) {
      console.log(error);
      return { code: -99, message: error?.message };
    }
  };
  
  module.exports = { addProduct, updateProduct, getProducts,deleteProducts };