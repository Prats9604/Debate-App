const express = require("express");
const app = express();

const NotificationSchema = require("../Models/notifySchema");

// get all notifications
app.get("/notifications", async (req, res) => {
  try {
    const notifications = await NotificationSchema.find();
    res.json(notifications);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// get notification by user ID
app.get("/notifications/:id", async (req, res) => {
  const senderId = req.params.id;

  try {
    const notifications = await NotificationSchema.find({ senderId: senderId });
    res.status(200).json(notifications);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = app;
