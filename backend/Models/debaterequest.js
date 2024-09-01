const mongoose = require("mongoose");

const debateRequestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    team: { type: String, enum: ["red", "blue"], required: true },
    message: { type: String },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    debateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DebateTopic",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const DebateRequest = mongoose.model("DebateRequest", debateRequestSchema);

module.exports = DebateRequest;
