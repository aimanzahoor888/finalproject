import mongoose from "mongoose";

const negotiationSchema = mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    buyerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    initialPrice: { type: Number, required: true },
    counterPrice: { type: Number },
    finalPrice: { type: Number },
    status: { type: String, enum: ["pending", "accepted", "rejected", "countered"], default: "pending" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

const Negotiation = mongoose.model("Negotiation", negotiationSchema);
export default Negotiation;
