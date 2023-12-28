const mongoose = require("mongoose");

const NotificationSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
    },
    description: {
      type: String,
      required: [true, "Description is required."],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("notification", NotificationSchema);
