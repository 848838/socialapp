const mongoose = require('mongoose');
const Post = require('./Post');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    verified: {
        type: Boolean,
        default: false
    },
    verificationToken: String,
    profileImage: {
        type: String,
        default: '', // Default to null if not provided
    },
    description:String,
    userDescription: {
        type: String,
        default: ''
    },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],  // Followers of this user
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],   // Users this user is following
    connections: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    connectionRequests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    sentConnectionRequests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    Post: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;