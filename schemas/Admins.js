const { Schema, model } = require("mongoose");

const adminSchema = new Schema(
  {
    full_name: { type: String, required: true, trim: true },
    user_name: { type: String, required: true, unique: true, trim: true },
    password: {
      type: String,
      required: true,
      min: [8, "Kamida 8 ta belgi bo'lishi kerak"],
    },
    phone_number: { type: String, trim: true },
    email: { type: String, trim: true, unique: true },
    is_creator: { type: Boolean, default: false },
    is_active: { type: Boolean, default: true },
    description: { type: String },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

module.exports = model("Admin", adminSchema);
