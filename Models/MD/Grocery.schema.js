const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const schema = new Schema(
  {
    name: {
      type: String,
      default: "",
      require:true
    },
    description: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      default: 0,
      require:true
    },
    discount: {
      type: Number,
      default: 0,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },    
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Grocery", schema);
