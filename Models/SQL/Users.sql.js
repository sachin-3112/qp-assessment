const { DataTypes } = require('sequelize');
const sqlConn = require('./SQLConn'); 

const Users = sqlConn.define('Users', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isActive:{
    type: DataTypes.BOOLEAN,
    defaultValue:true
  },    
  country: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue:''
  },
});


const Cart = sqlConn.define('Cart', {});

// Define association with Cart
Users.hasMany(Cart,{ foreignKey: 'UserId' });
// Define associations
// Cart.belongsTo(Users,{ foreignKey: 'UserId' });

// const db = {};
// db.Sequelize = sqlConn;
// db.Users = Users;
// db.Cart = Cart;

// db.Sequelize.sync({force:true}).then(() => console.log("Database synced"));


module.exports = Users;