const { DataTypes } = require('sequelize');
const sqlConn = require('./SQLConn');

const Grocery = sqlConn.define('Grocery', {

  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    defaultValue: ""
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  discount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue:1
  },
  isAvailable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },  
});


const Cart = sqlConn.define('Cart', {});
 

// Define associations
// Grocery.belongsTo(Cart,{ foreignKey: 'CartId' })
Cart.belongsTo(Grocery,{ foreignKey: 'GroceryId' });

// const db = {};
// db.Sequelize = sqlConn;
// db.Grocery = Grocery;
// db.Cart = Cart;

// db.Sequelize.sync().then(() => console.log("Database synced"));


module.exports = Grocery;
