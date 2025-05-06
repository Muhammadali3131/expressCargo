const { Schema, model } = require("mongoose");

const operationSchema = new Schema(
  {
    order_id: { type: Schema.Types.ObjectId, ref: "Order", required: true },
    status_id: { type: Schema.Types.ObjectId, ref: "Status", required: true },
    operation_date: { type: Date, default: Date.now },
    admin_id: { type: Schema.Types.ObjectId, ref: "Admin", required: true },
    description: { type: String },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

module.exports = model("Operation", operationSchema);
