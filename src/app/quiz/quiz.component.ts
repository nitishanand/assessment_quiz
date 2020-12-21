import { Component, OnInit, Output, Inject } from '@angular/core';
import { Question } from '../interfaces/question';
import { QuizQuestionsService } from '../service/quiz-questions.service';
import { User } from '../interfaces/user';
import { ConnectionService } from 'ng-connection-service';
import { UsersService } from '../service/users.service';
import { Router } from '@angular/router';
import { WebStorageService, SESSION_STORAGE } from 'angular-webstorage-service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  // @Output() userScore = new EventEmitter<number>();

  userDetails: any[] = [];

  // storage for all the questions once quiz is intialized
  questionsList: Question[] = [];
  answersList = [];
  correctAnswers = [];

  // store the active question number
  activeQuestion: number = 0;

  // store options selected by the user along with answers received from database
  userSelectionOptionArray = [];
  userSelectionAnswerArray = [];

  // variables for toggling disabled state of Next and Previous buttons
  isNextButtonDisabled = true;
  isPrevButtonDisabled = true;
  isSubmitButtonVisible = false;

  // store assessment score along with status of assessment
  assessmentScore = 0;
  assessmentCompleted = false;

  // flag to trigger a service error if any and display a error message accordingly.
  serviceError = false;
  serviceErrorMessage;

  // checking active internet connection
  internetConnectivity = true; //initializing as online by default
  isConnected = true;
  connectionErrorMessage: string;

  error: any;

  constructor(
    private quizQuestionsService: QuizQuestionsService,
    private usersService: UsersService,
    private connectionService: ConnectionService,
    private router: Router,
    @Inject(SESSION_STORAGE) private storage: WebStorageService
  ) {
    // check for active internet connection
    this.connectionService.monitor().subscribe({
      next: (isConnected) => {
        if (isConnected) {
          this.internetConnectivity = true;
        } else {
          this.internetConnectivity = false;
        }

        const user: User = {
          name: this.userDetails[0],
          email: this.userDetails[1],
          role: this.userDetails[2],
          shortrole: this.userDetails[3],
          score: this.userDetails[4]
        };

        if (this.internetConnectivity && this.assessmentCompleted) {
          this.usersService.addUserScore(user).subscribe(
            data => console.log(data),
            err => this.error = err,
            () => {
              // after 5 seconds, the user will be redirected to register page and user information from the session will be cleared immediately
              setTimeout(() => {
                this.clearSession();
                this.router.navigate(['/']);
              }, 5000);
            }
          );
        }
      },
      error: (err) => {
        this.connectionErrorMessage = 'The internet connection seems to be offline. Try after sometime.'
      }
    });
  }

  // Get list of questions once component is initialized
  ngOnInit() {
    this.questionsList = this.getFromSession('quizQuestions');
    this.userDetails = this.getFromSession('userDetails');

    if (this.internetConnectivity) {
      // get all answers via service
      this.quizQuestionsService.getAnswers(this.userDetails[3]).subscribe(
        (res) => {
          for (let i = 0; i < res.length; i++) {
            // store the received answers along with id for further comparison and sorting
            this.answersList.push({_id: res[i]['_id'], answer: res[i]['answer']});
          }

          // traverse all the questions and answers for creating a new list of matching answers for fetched questions
          this.questionsList.forEach((question) => {
            for (let i = 0; i < this.answersList.length; i++) {
              if (question['_id'] === this.answersList[i]['_id']) {
                // console.log('matches' + ', ' + question['_id'] + ', ' + this.answersList[i]['_id'] + ', ' + this.answersList[i]['answer']);
                // this.answersList = [];
                // this.answersList.push({_id: this.answersList[i]['_id'], answer: this.answersList[i]['answer']});
                // this.answersList = [];
                // console.log(typeof this.answersList);
                this.correctAnswers.push(this.answersList[i]['answer']);
              }
            }
          });

          // console.log(this.correctAnswers);
        },
        (err) => {
          this.serviceError = true;
          this.serviceErrorMessage = err;
          console.error(err);
        }
      )
    }
  }

  saveInSession(key, val) {
    this.storage.set(key, val);
    this.userDetails[key] = this.storage.get(key);
  }

  onNextQuestion() {
    if (!(this.activeQuestion >= this.questionsList.length - 1)) {
      this.activeQuestion++;
      setTimeout(() => this.onPopulateOptions(this.userSelectionOptionArray, this.activeQuestion), 100);
    } else {
      this.isNextButtonDisabled = true;
      return this.questionsList.length;
    }

    // enable the previous button if active question is greater than 1
    if (this.activeQuestion > 0) {
      this.isPrevButtonDisabled = false;
    }

    this.isNextButtonDisabled = true;

    // on each button click check if the active question is the last question to disable next button
    this.isLastQuestion();
  }

  onPrevQuestion() {
    if (!(this.activeQuestion < 0)) {
      this.activeQuestion--;
      setTimeout(() => this.onPopulateOptions(this.userSelectionOptionArray, this.activeQuestion), 100);
    } else {
      this.isPrevButtonDisabled = true;
      return this.questionsList.length;
    }

    // enable the next button if active question is less than length of questions
    if (this.activeQuestion < this.questionsList.length - 1) {
      this.isNextButtonDisabled = false;
    }

    // on each button click check if the active question is the first question to disable previous button
    this.isFirstQuestion();

    // this.onPopulateOptions();
  }

  isFirstQuestion() {
    if (this.activeQuestion === 0) {
      this.isPrevButtonDisabled = true;
    }
  }

  isLastQuestion() {
    if (this.activeQuestion === this.questionsList.length - 1) {
      this.isNextButtonDisabled = true;
    }
  }

  onOptionChange(el) {
    if (!(this.activeQuestion === this.questionsList.length)) {
      if (this.userSelectionOptionArray.length) {
        this.userSelectionOptionArray[this.activeQuestion] = +el.target.id;
        this.userSelectionAnswerArray[this.activeQuestion] = el.target.value;
      } else {
        this.userSelectionOptionArray.push(+el.target.id);
        this.userSelectionAnswerArray.push(el.target.value);
      }

      this.isNextButtonDisabled = false;
    }

    if (this.activeQuestion === this.questionsList.length - 1) {
      this.isNextButtonDisabled = true;
      this.isSubmitButtonVisible = true;
    }
  }

  onPopulateOptions(userAnswer, activeQuestion) {
    let target = <HTMLCollection> document.getElementsByClassName('option-list');
    let optionList = target[0].children;
    let input;

    if (this.userSelectionOptionArray[this.activeQuestion] >= 0) {
      input = optionList[this.userSelectionOptionArray[this.activeQuestion]].children[0] as HTMLInputElement;

      input.checked = true;

      if (input.checked) {
        this.isNextButtonDisabled = false;
      }
    }

    if (this.activeQuestion === this.questionsList.length - 1) {
      this.isNextButtonDisabled = true;
    }
  }

  onSubmitQuiz() {
    for (let i = 0; i < this.questionsList.length; i++) {
      if (this.userSelectionAnswerArray[i] === this.correctAnswers[i]) {
        this.assessmentScore += 1;
      }
    }

    this.assessmentCompleted = true;

    if (this.assessmentCompleted) {
      this.userDetails.push(this.assessmentScore);

      // console.log(this.userDetails);

      const user: User = {
        name: this.userDetails[0],
        email: this.userDetails[1],
        role: this.userDetails[2],
        shortrole: this.userDetails[3],
        score: this.userDetails[4]
      };

      // console.log(`Internet connection: ${this.internetConnectivity}`);

      if (this.internetConnectivity) {
        this.usersService.addUserScore(user).subscribe(
          data => {},
          err => this.error = err,
          () => {
            // after 5 seconds, the user will be redirected to register page and user information from the session will be cleared immediately
            setTimeout(() => {
              this.clearSession();
              this.router.navigate(['/']);
            }, 5000);
          }
        );
      } else {
        // localStorage.setItem('score', String(this.assessmentScore));
        sessionStorage.removeItem('userDetails');
        // sessionStorage.setItem('userDetails', this.userDetails);
        this.saveInSession('userDetails', this.userDetails);
      }
    }
  }

  getFromSession(key: string) {
    if (sessionStorage) {
      if (sessionStorage.getItem(key)) {
        return JSON.parse(sessionStorage.getItem(key));
      } else {
        // console.log('does not exist');
        return false;
      }
    }
  }

  clearSession() {
    if (sessionStorage) {
      if (sessionStorage.getItem('userDetails')) {
        sessionStorage.removeItem('userDetails');
      }

      if (sessionStorage.getItem('quizQuestions')) {
        sessionStorage.removeItem('quizQuestions');
      }
    }
  }

  checkConnection() {
    if (this.internetConnectivity) {

    }
  }

}
