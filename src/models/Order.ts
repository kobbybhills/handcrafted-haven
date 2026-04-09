import mongoose, { Schema, model, models } from "mongoose";

const OrderSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: "User", required: true },
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, default: 1 },
  totalPrice: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ["pending", "processing", "shipped", "delivered"], 
    default: "pending" 
  },
  createdAt: { type: Date, default: Date.now },
});

const Order = models.Order || model("Order", OrderSchema);
export default Order;