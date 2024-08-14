const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  email: [{
    type: String,
    required: true

  }],
  text: {
    type: String,
    required:true
  },
  name: [
    {
      type: String,
      required: true

    }
  ],
  Mobile: [
    {
      type: String,


    }
  ],
  Subject: {
      type: String,
 
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;