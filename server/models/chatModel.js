const mongoose = require("mongoose");

const chatModel = mongoose.Schema(
  {
    users: [
      {
        User_model: {
          type: String,
          enum: ['Employees', 'Seekers'],
          required: true,
        },
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          refPath: 'users.User_model',
          required: true,
        },
      },
    ],
    messages: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
    }],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  },
);

const Chat = mongoose.model("Chat", chatModel);



const messageSchema = mongoose.Schema(
  {

    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
    content: [{
      msg: { type: String, trim: true },
      sender: { type: mongoose.Schema.Types.ObjectId, refPath: "content.senderType" },
      senderType: { type: String, enum: ['Employees', 'Seekers'], required: true },
      receiver: { type: mongoose.Schema.Types.ObjectId, refPath: "content.receiverType" },
      receiverType: { type: String, enum: ['Employees', 'Seekers'], required: true },
    }],
  },

  {
    timestamps: true
  },


);

const Message = mongoose.model("Message", messageSchema);
module.exports = { Chat, Message };


