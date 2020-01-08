/* const http = require('http');

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  // console.log('Hello World!!!');
  res.end('Hello!');
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
}); */

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const bodyParser = require('body-parser');

// include a local database for populating questions
const db = require('./db.json');

const Question = require('./models/question');

const questionsCount = db.questions.length;

const port = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://shantanupatel:c9YHpgxGrN1xJ3qe@cluster0-rlpjt.mongodb.net/quiz?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
  console.log('Connected to database');
}).catch(() => {
  console.log('Connection failed');
});

var db1 = mongoose.connection;

// console.log(db1);

db1.on('error', console.error.bind(console, 'connection error:'));

/* db1.once('open', function() {
  var question1 = new Question({ title: 'What is full form of CSS?', options: [
    "Copying Style Sheets", "Cascading Style Sheets", "Containing Style Sheets", "None of the above"
  ], answer: "Cascading Style Sheets", min_exp: 0, max_exp: 1 });

  question1.save((err, question) => {
    if (err) return console.error(err);
    console.log(question.title + ' saved to the questions collection');
  });
}); */

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

/* app.get('/', (req, res) => {
  res.send('This is the home page!');
}); */

app.get('/api/questions', (req, res, next) => {
  /* const questions = '';
  res.status(200).json({
    message: 'Questions fetched successfully',

  }) */

  async function getAllQuestions() {
    const questions = await Question.find();
    res.send(questions);
    // console.log(query);
  }

  getAllQuestions();
});

app.get('/api/answers', (req, res, next) => {
  async function getAllAnswers() {
    const answers = await Question.find().select('-_id').select('-title').select('-options').select('+answer');
    res.send(answers);
  }

  getAllAnswers();
});

app.post('/api/addquestion', (req, res, next) => {
  /* const question = new Question({
    title: req.body.title,
    options: req.body.options,
    min_exp: req.body.min_exp,
    max_exp: req.body.max_exp,
    question_type: req.body.question_type
  }); */

  /* var question1 = new Question({ title: 'What is full form of CSS?', options: [
    "Copying Style Sheets", "Cascading Style Sheets", "Containing Style Sheets", "None of the above"
  ], answer: "Cascading Style Sheets", min_exp: 0, max_exp: 1 }); */

  // res.send(req.body);

  var question1 = new Question({
    title: req.body.title,
    options: req.body.options,
    answer: req.body.answer,
    min_exp: req.body.min_exp,
    max_exp: req.body.max_exp,
    question_type: req.body.question_type
  });

  question1.save((err, question) => {
    if (err) return console.error(err);
    console.log(question.title + ' saved to the questions collection');
  });

  res.status('201').json({
    message: 'Question added successfully'
  });
});

/* 
// retrieve all the questions
app.get('/api/questions', (req, res) => {
  // old implementation causing issue with populating questions on frontend
  // res.send(db);

  // fixed issue for questions not populating on frontend by sending data of questions
  res.send(db.questions);
});

// retrieve a specific question on the basis of provided id as query parameter
// This feature will be useful for editing questions via the admin section
app.get('/api/questions/:id', (req, res) => {
  const requestedQuestion = parseInt(req.params.id);

  function findQuestion() {
    let foundItem;

    db.questions.forEach((item, index) => {
      if (item.id === requestedQuestion) {
        foundItem = item;
      }
    });

    if (foundItem) {
      return foundItem;
    } else {
      return 'No record found';
    }
  }

  let filteredArray = findQuestion(requestedQuestion);

  res.send(filteredArray);
});

app.post('/api/question', (req, res) => {

}); */

app.listen(port, () => console.log(`Listening on port ${port}`));