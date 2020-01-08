const mongoose = require('mongoose');

var answerSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'questions'
  }
},
{
  versionKey: false
});

module.exports = mongoose.model('Answers', answerSchema, 'answers');
