# Debate App

A dynamic debate platform built with React Native, Node.js, Express.js, MongoDB, and Socket.IO. The app facilitates one-on-one and team-based debates, allowing users to create and engage in debates, track progress, and communicate in real time.

## Features

- **User Authentication**: Sign up or log in to access the app.
- **Home Page**: View debate topics raised by other users, add your own topics, and send requests to debate on existing ones.
- **1-on-1 Debates**: If a debate request is accepted, a one-on-one debate begins between two users—one representing the Blue team and the other the Red team.
- **Team Joining**: Spectators can request to join a debate by choosing a team (Red or Blue). Team leaders can accept or reject these requests.
- **Debate End Conditions**:
  - Teams can back off and accept defeat, granting the opponent victory.
  - If no reply is given within 24 hours, the other team automatically wins.
  - A team can accept defeat if they agree with the opposing team's justification.
- **Debate Conclusion**: The winning team can write a conclusion that will be visible to all viewers.
- **Debate Listing and Sorting**: View ongoing and completed debates, with sorting options to filter based on status.
- **Notifications**: Get notified of new debate requests, responses, and 24-hour reply warnings.

## Tech Stack

- **Frontend**: React Native for a seamless mobile experience.
- **Backend**: Node.js with Express.js for API management.
- **Database**: MongoDB for efficient data storage.
- **Real-Time Communication**: Socket.IO for real-time updates and communication during debates.
