import mongoose, { Schema, model, models } from "mongoose";

const ReviewSchema = new Schema({
  userEmail: { type: String, required: true },
  userName: { type: String, required: true },
  productId: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Review = models.Review || model("Review", ReviewSchema);

export default Review;