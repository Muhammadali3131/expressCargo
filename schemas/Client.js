const { Schema, model } = require("mongoose");

const clientSchema = new Schema(
  {
    full_name: { type: String, required: true },
    phone_number: { type: Number, required: true },
    address: { type: String },
    location: { type: String },
    email: { type: String },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("Client", clientSchema);
