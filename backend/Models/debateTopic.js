const mongoose = require("mongoose");

const DebateTopicSchema = new mongoose.Schema(
  {
    debateName: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Ongoing", "Completed", "Upcoming"],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    conclusion: {
      type: String,
      default: "",
    },
    redTeam: {
      TeamLeaderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      TeamMembers: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    blueTeam: {
      TeamLeaderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      TeamMembers: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    winner: {
      type: String,
      enum: ["Ongoing", "Completed", "Upcoming"],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("DebateTopic", DebateTopicSchema);
