const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const cart = new Schema(
  {
    product: {
      type: Schema.ObjectId,
      ref: 'Grocery'
    },
    quantity:{
      type:Number,
      default:1
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const schema = new Schema(
  {
    firstName: {
      type: String,
      default: "",
      require:true
    },
    lastName: {
      type: String,
      default: "",
      require:true
    },
    mobile: {
      type: String,
      default: "",
      require:true
    },
    email: {
      type: String,
      default: "",
      require:true
    },
    password: {
      type: String,
      default: "",
      require:true
    },
    isActive: {
      type: Boolean,
      default: true,
    },    
    country: {
      type: String,
      default: "",
    },
    cart: [cart],
    role: {
        type: String,
        default: "",
        enum:["","ADMIN","SUPPLIER"]
      },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// module.exports = mongoose.model.Users || model("Users", schema);
module.exports = model("Users", schema);
