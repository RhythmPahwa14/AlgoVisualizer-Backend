const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
  },
    message: {
        type: String,
        required: true,
    },
    createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Feedback' , FeedbackSchema);