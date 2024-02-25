const { DataTypes } = require('sequelize');
const sqlConn = require('./SQLConn'); 

const Users = sqlConn.define('Users', {});
const Grocery = sqlConn.define('Grocery', {});


const Cart = sqlConn.define('Cart', {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
});

// Define associations
Cart.belongsTo(Users,{ foreignKey: 'UserId' });
Cart.belongsTo(Grocery,{ foreignKey: 'GroceryId' });

// const db = {};
// db.Sequelize = sqlConn;
// // db.Users = Users;
// db.Cart = Cart;

// db.Sequelize.sync({force:true}).then(() => console.log("Database synced"));


module.exports = Cart;