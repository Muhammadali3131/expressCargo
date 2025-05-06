const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    order_unique_id: { type: String, required: true, unique: true },
    client_id: { type: Schema.Types.ObjectId, ref: "Client", required: true },
    product_link: { type: String, trim: true },
    quantity: { type: Number, default: 1 },
    summa: { type: Number },
    currency_type_id: {
      type: Schema.Types.ObjectId,
      ref: "CurrencyType",
      required: true,
    },
    truck: { type: String, trim: true },
    description: { type: String, trim: true },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

module.exports = model("Order", orderSchema);
