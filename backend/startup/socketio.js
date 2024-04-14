const { User } = require("../models/user");

module.exports = function (io) {
  io.on("connection", (socket) => {
    socket.on("mavi", (msg) => {
      console.log(">>>>>>>mavi: " + msg);
    });

    console.log("A user connected");

    // Listen for the 'joinChat' event sent by the client
    socket.on("joinChat", (chatId, userId) => {
      // Join a room based on the chat ID
      socket.join(chatId);

      // console.log(`User ${userId} >>>>>>>>> got called the id is ${chatId}`);
      // Update the user's onlineStatus field to "online"
      User.findByIdAndUpdate(userId, { onlineStatus: "online" }).exec();

      console.log(`User ${userId} joined chat ${chatId}`);
    });

    // Handle chat events here
    socket.on("chatMessage", (messageData) => {
      // Handle the incoming chat message and broadcast it to relevant participants
      // You can use the 'messageData' to identify the chat and participants
      // and send the message to the appropriate room or users.
      const { chatId, userId } = messageData;

      // Emit the message to the specific chat room
      io.to(chatId).emit("newMessage", messageData);
    });

    // Listen for the 'typing' event sent by the client
    socket.on("typing", (chatId, userId) => {
      // Emit a socket event to notify participants in the chat that the user of id fulani is typing
      io.to(chatId).emit("userTyping", userId);
      // io.emit("userTyping", "mavi");

       // Update the user's onlineStatus field to "typing"
      // User.findByIdAndUpdate(userId, { onlineStatus: "typing" }).exec();
    });

    // Handle disconnect event
    socket.on("disconnect", (userId) => {
      console.log("A user disconnected");

      // Find the chat ID associated with the disconnected user
      const chatId = socket.rooms.values().next().value;

      if (chatId) {
        // Emit a socket event to notify participants in the chat that the user is offline
        io.to(chatId).emit("userOffline", userId);
      }

      // Update the user's onlineStatus field to "offline" on disconnect
      User.findByIdAndUpdate(userId, { onlineStatus: "offline" }).exec();
    });
  });
};
