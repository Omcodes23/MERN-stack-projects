const mongoose = require('mongoose');

// Define the Quiz schema
const quizSchema = new mongoose.Schema({
  quizName: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  questions: [
    {
      question: {
        type: String,
        required: true,
      },
      options: {
        type: [String],
        required: true,
      },
      correctOption: {
        type: Number,
        required: true,
        min: 0,
        max: 3,
      },
    },
  ],
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
