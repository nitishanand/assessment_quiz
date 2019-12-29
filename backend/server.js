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
const app = express();
const bodyParser = require('body-parser');

// include a local database for populating questions
const db = require('./db.json');

const questionsCount = db.questions.length;

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.get('/', (req, res) => {
  res.send('This is the home page!');
});

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

});

app.listen(port, () => console.log(`Listening on port ${port}`));