const mongoose = require('mongoose');

/* const questionSchema = mongoose.Schema({
  // title: {
  //   type: String,
  //   required: true
  // },
  // options: {
  //   type: String,
  //   required: false
  // },
  // min_exp: {
  //   type: Number,
  //   required: true
  // },
  // max_exp: {
  //   type: Number,
  //   required: true
  // },
  // question_type: {
  //   type: String,
  //   required: true
  // }

  title: {
    'type': String,
    'required': true
  },
  options: [String],
  min_exp: {
    'type': Number,
    'required': true
  },
  max_exp: {
    'type': Number,
    'required': true
  },
  question_type: {
    'type': String,
    'required': true
  }
}); */

const Schema = mongoose.Schema;

var questionSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  options: {
    type: [String],
    required: false
  },
  answer: {
    type: String,
    required: true,
    select: false
  },
  min_exp: {
    type: String,
    required: false,
    select: false
  },
  max_exp: {
    type: String,
    required: false,
    select: false
  },
  question_type: {
    type: String,
    required: false,
    select: false
  },
  created: {
    type: Date,
    default: Date.now,
    select: false
  }
},
{
  versionKey: false
});

module.exports = mongoose.model('Question', questionSchema, 'questions');
