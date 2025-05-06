const { Schema, model } = require("mongoose");

const clientSchema = new Schema(
  {
    full_name: { type: String, required: true, trim: true },
    phone_number: { type: String, required: true, trim: true },
    address: { type: String, trim: true },
    location: { type: String, trim: true },
    email: { type: String, trim: true },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

module.exports = model("Client", clientSchema);
