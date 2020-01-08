const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Question = require('./models/question');

const app = express();

mongoose.connect('mongodb+srv://shantanupatel:c9YHpgxGrN1xJ3qe@cluster0-rlpjt.mongodb.net/quiz?retryWrites=true&w=majority').then(() => {
  console.log('Connected to database');
}).catch(() => {
  console.log('Connection failed');
});

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.post('/api/question', (req, res, next) => {
  const question = new Question({
    title: req.body.title,
    options: req.body.options,
    min_exp: req.body.min_exp,
    max_exp: req.body.max_exp,
    question_type: req.body.question_type
  });

  question.save();

  res.status('201').json({
    message: 'Question added successfully'
  });
});

app.get('/api/questions', (req, res, next) => {
  const questions = '';
  res.status(200).json({
    message: 'Questions fetched successfully',

  })
});

module.exports = app;