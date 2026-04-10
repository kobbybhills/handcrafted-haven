import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }, // We will hash this!
  role: { type: String, default: "customer" }, // "seller" for you, "customer" for others
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);