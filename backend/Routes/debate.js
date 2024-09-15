const express = require("express");
const app = express();
const DebateTopic = require("../Models/debateTopic");
const User = require("../Models/schema");
const DebateRequest = require("../Models/debaterequest");
const NotificationSchema = require("../Models/notifySchema");

// Create Debate Topic
app.post("/debate", async (req, res) => {
  const { debateName, status, description, userId } = req.body;

  try {
    const debateTopic = new DebateTopic({
      debateName,
      status,
      description,
      blueTeam: {
        TeamLeaderId: userId,
        TeamMembers: [userId],
      },
    });

    await debateTopic.save();
    res.json(debateTopic);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get all debate topics
app.get("/getalldebate", async (req, res) => {
  try {
    const debateTopics = await DebateTopic.find();
    res.json(debateTopics);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get debate topic by ID
app.get("/debate/:id", async (req, res) => {
  const debateTopicId = req.params.id;

  try {
    const debateTopic = await DebateTopic.findById(debateTopicId);
    res.json(debateTopic);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// GET debate requests by userID
app.get("/debate/user/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const debate = await DebateTopic.find({
      $or: [
        { "redTeam.TeamLeaderId": userId },
        { "redTeam.TeamMembers": userId },
        { "blueTeam.TeamLeaderId": userId },
        { "blueTeam.TeamMembers": userId },
      ],
    });

    res.json(debate);
  } catch (err) {}
});

// Get debate status by ID
// app.get("/debate/:id/status", async (req, res) => {
//   const debateTopicId = req.params.id;

//   try {
//     const debateTopic = await DebateTopic.findById(debateTopicId);

//     if (!debateTopic) {
//       return res.status(404).json({ msg: "Debate topic not found" });
//     }

//     res.json({ status: debateTopic.status });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// });

// send debate request to join a debate
app.post("/debate/sendrequest", async (req, res) => {
  const { debateId, userId, message, team } = req.body;

  try {
    const debate = await DebateTopic.findById(debateId);
    const user = await User.findById(userId);

    if (!debate) {
      return res.status(404).json({ msg: "Debate topic not found" });
    }

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const debateRequest = new DebateRequest({
      debateId,
      userId,
      message,
      team,
    });

    await debateRequest.save();
    const teamLeadId =
      team === "red"
        ? debate.redTeam.TeamLeaderId
        : debate.blueTeam.TeamLeaderId;
    console.log("debate ===", debate);
    console.log("teamlead ==", teamLeadId);

    if (team === "red" && teamLeadId === undefined) {
      // debate.redTeam.TeamLeaderId = userId;
      // debate.redTeam.TeamMembers.push(userId);
      // await debate.save();

      console.log("userId ===", userId);
      const notification = new NotificationSchema({
        senderId: userId,
        message: `New join request for your team in debate: ${debate.topicId}`,
        type: "Request",
      });
      await notification.save();
    } else {
      const notification = new NotificationSchema({
        senderId: teamLeadId,
        message: `New join request for your team in debate: ${debate.topicId}`,
        type: "Request",
      });

      await notification.save();
    }

    console.log("debateRequest ===", debate);

    res.status(200).json({
      message: "Join Request sent",
      data: debateRequest,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// accept or reject debate request
app.post("/debate/acceptreject", async (req, res) => {
  const { debateId, requestId, status } = req.body;

  try {
    const debate = await DebateTopic.findById(debateId);
    const request = await DebateRequest.findById(requestId);

    if (!debate) {
      return res.status(404).json({ msg: "Debate topic not found" });
    }

    if (!request) {
      return res.status(404).json({ msg: "Request not found" });
    }

    if (status === "accepted") {
      if (request.team === "red") {
        if (debate.redTeam.TeamLeaderId === undefined) {
          debate.redTeam.TeamLeaderId = request.userId;
        }
        debate.redTeam.TeamMembers.push(request.userId);
      } else {
        debate.blueTeam.TeamMembers.push(request.userId);
      }
      await debate.save();

      const notification = new NotificationSchema({
        senderId: request.userId,
        message: `Your request to join debate: ${debate.topicId} has been accepted`,
        type: "Request",
      });

      await notification.save();
    } else if (status === "rejected") {
      const notification = new NotificationSchema({
        senderId: request.userId,
        message: `Your request to join debate: ${debate.topicId} has been rejected`,
        type: "Request",
      });

      await notification.save();
    }

    request.status = status;
    await request.save();

    res.status(200).json({
      message: "Request status updated",
      data: request,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = app;
