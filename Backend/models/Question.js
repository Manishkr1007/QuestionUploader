const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  topic: String,
  question: String,
  options: {
    a: String,
    b: String,
    c: String,
    d: String
  },
  answer: String
});

module.exports = mongoose.model('Question', QuestionSchema);
