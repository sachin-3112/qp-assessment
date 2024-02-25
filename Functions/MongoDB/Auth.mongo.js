const UsersModel = require("../../Models/MD/Users.schema");

const login = async (input) => {
  try {
    const { username, password } = input;

    const dbResponse = await UsersModel.findOne({
      email: username?.trim(),
      password: password?.trim(),
    });

    if (!dbResponse) {
      return { code: -2, message: "No user found with provided username and password.", data: null };
    }

    const usersData = dbResponse._doc;

    delete usersData.password;
    delete usersData.cart;

    return { code: 1, message: "Success", data: { ...usersData } };
  } catch (error) {
    console.log(error);
    return { code: -99, message: error?.message };
  }
};

const createUser = async (input) => {
  try {
    const userData = await (await UsersModel.create({ ...input })).save();

    if (!userData) {
      return { code: -2, message: "Fail to create account.", data: null };
    }
    return { code: 1, message: "Success", data: userData?._id };
  } catch (error) {
    console.log(error);
    return { code: -99, message: error?.message };
  }
};

const createAdmin = async (input) => {
  try {
    const userData = await (await UsersModel.create({ ...input, role: "ADMIN" })).save();

    if (!userData) {
      return { code: -2, message: "Fail to create account.", data: null };
    }
    return { code: 1, message: "Success", data: userData?._id };
  } catch (error) {
    console.log(error);
    return { code: -99, message: error?.message };
  }
};

module.exports = { login, createAdmin, createUser };
