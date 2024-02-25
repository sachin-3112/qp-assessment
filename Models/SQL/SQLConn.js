const { Sequelize } = require("sequelize");

// Create Sequelize instance
const sqlConn = new Sequelize(process.env.MYSQL_DB, process.env.MYSQL_USERNAME, process.env.MYSQL_PASSWORD, {
  host: process.env.HOST,
  port: process.env.MYSQL_PORT,
  dialect: "mysql",
});

// Listening for 'connected' event
sqlConn
  .authenticate()
  .then(async () => {
    console.log("SQL Conn established successfully.");

    const Users = require("./Users.sql");
    const Grocery = require("./Grocery.sql");
    const Cart = require("./Cart.sql");

    await Users.sync({ alter: true });
    await Grocery.sync({ alter: true });
    await Cart.sync({ alter: true });
    
  })
  .catch((err) => {
    console.error("Unable to connect to the SQL database:", err);
  });

module.exports = sqlConn;
