const express = require("express");
const app = express();
const Chat = require("../Models/chatSchema.js");

// Create Chat
app.post("/chats", async (req, res) => {
  const { message, senderId, debateId } = req.body;

  try {
    const chat = new Chat({
      message,
      senderId,
      debateId,
    });

    await chat.save();
    res.json(chat);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get all chats
app.get("/chats", async (req, res) => {
  try {
    const chats = await Chat.find();
    res.json(chats);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get chat by ID
app.get("/chats/:id", async (req, res) => {
  const chatId = req.params.id;

  try {
    const chat = await Chat.findById(chatId);
    res.json(chat);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get chat by debate ID
app.get("/chats/debate/:id", async (req, res) => {
  const debateId = req.params.id;

  try {
    const chat = await Chat.find({ debateId });
    res.json(chat);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = app;
