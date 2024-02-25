const Users = require("../../Models/SQL/Users.sql");

const login = async (input) => {
  try {
    const { username, password } = input;

    const dbResponse = await Users.findOne({
      where: {
        email: username?.trim(),
        password: password?.trim(),
      },
    });
    const usersData = dbResponse?.toJSON() || null;

    if (!usersData) {
      return { code: -2, message: "No user found with provided username and password.", data: null };
    }

    delete usersData.password;
    delete usersData.cart;

    return { code: 1, message: "Success", data: { ...usersData } };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createUser = async (input) => {
  try {
    const userData = await (await Users.create({ ...input })).save();
    const _res = userData?.toJSON() || null;
    if (!_res) {
      return { code: -2, message: "Fail to create account.", data: null };
    }
    return { code: 1, message: "Success", data: _res?.id };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createAdmin = async (input) => {
  try {
    const userData = await (await Users.create({ ...input, role: "ADMIN" })).save();
    const _res = userData?.toJSON() || null;
    if (!_res) {
      return { code: -2, message: "Fail to create account.", data: null };
    }
    return { code: 1, message: "Success", data: _res?.id };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = { login, createAdmin, createUser };
