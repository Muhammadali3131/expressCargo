const { Schema, model } = require("mongoose");

const currencyTypeSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("CurrencyType", currencyTypeSchema);
