const { Schema, model } = require("mongoose");

const statusSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

module.exports = model("Status", statusSchema);
