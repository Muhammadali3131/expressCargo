const { Schema, model } = require("mongoose");

const currencyTypeSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

module.exports = model("CurrencyType", currencyTypeSchema);
