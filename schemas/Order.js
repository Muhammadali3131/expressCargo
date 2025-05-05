const { Schema, model, Types } = require("mongoose");

const orderSchema = new Schema(
  {
    order_unique_id: { type: String, required: true }, // uuid sifatida saqlanadi
    client_id: { type: Types.ObjectId, ref: "Client", required: true },
    product_link: { type: String },
    quantity: { type: Number },
    summa: { type: Number },
    currency_type_id: { type: Types.ObjectId, ref: "CurrencyType" },
    truck: { type: String },
    description: { type: String },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("Order", orderSchema);
