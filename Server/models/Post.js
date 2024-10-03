const mongoose = require('mongoose');

// Define a schema for comments

const postSchema = new mongoose.Schema({
  imageUrl: [{
    type: String,
    required: true // Ensure this field is required
  }],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  },
  profileImage: {
    type: String,
    default: '' // Default to an empty string if no profile image is available
  },
  userName: {
    type: String,
    required: true
  },
  description: { 
    type: String, 
    default: '' 
  }, // Add description field
  likes: { 
    type: [mongoose.Schema.Types.ObjectId], 
    default: [] 
  }, // Array of user IDs who liked the post
  likeCount: { 
    type: Number, 
    default: 0 
  }, // Count of likes

  comments: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    commentText: { type: String, required: true },

    createdAt: { type: Date, default: Date.now },
    CommentCount: { 
      type: Number, 
      default: 0 
    }, // Count of likes
  }], // Add an array of comment subdocuments

  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: {
    type: Date,
    default: Date.now // Automatically set the creation date
  }
});

module.exports = mongoose.model('Post', postSchema);
