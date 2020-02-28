import { Component, OnInit, Output } from '@angular/core';
import { Question } from '../interfaces/question';
import { QuizQuestionsService } from '../service/quiz-questions.service';
import { EventEmitter } from '@angular/core';
import { User } from '../interfaces/user';
import { ConnectionService } from 'ng-connection-service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  // @Output() userScore = new EventEmitter<number>();

  userInfo: any[] = [];

  // storage for all the questions once quiz is intialized
  questionsList: Question[] = [];
  answersList = [];

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

  constructor(
    private quizQuestionsService: QuizQuestionsService,
    private connectionService: ConnectionService,
  ) { }

  // Get list of questions once component is initialized
  ngOnInit() {
    /* this.quizQuestionsService.getQuestions().subscribe((res) => {
      this.questionsList = res;

      // for (let i = 0; i < this.questionsList.length; i++) {
      //   this.answersList.push(this.questionsList[i].answer);
      // }
    }); */

    /* this.quizQuestionsService.getAnswers().subscribe((res) => {
      // this.answersList = res;

      for (let i = 0; i < res.length; i++) {
        this.answersList.push(res[i].answer);
      }
    });

    // console.log(this.answersList); */

    // check for active internet connection
    this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;

      if (this.isConnected) {
        this.internetConnectivity = true;
      } else {
        this.internetConnectivity = false;
      }
    });

    this.questionsList = this.getFromSession('quizQuestions');
    this.userInfo = this.getFromSession('userDetails');

    

    // console.log(this.userInfo[0]);
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

    // console.log(this.userSelectionAnswerArray);
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
    // let assessmentScoreArray: any[] = [];

    // check for active internet connection
    this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;

      if (this.isConnected) {
        this.internetConnectivity = true;
      } else {
        this.internetConnectivity = false;
      }

      // console.log(this.internetConnectivity);
    });

    if (this.internetConnectivity) {
      this.quizQuestionsService.getAnswers().subscribe(
        (res) => {
          // this.answersList = res;
  
          for (let i = 0; i < res.length; i++) {
            this.answersList.push(res[i].answer);
          }
        },
        (err) => {
          this.serviceError = true;
          this.serviceErrorMessage = err;
          console.error(err);
        },
        () => {
          for (let i = 0; i < this.questionsList.length; i++) {
            if (this.userSelectionAnswerArray[i] === this.answersList[i]) {
              this.assessmentScore += 1;
            }
          }
  
          this.assessmentCompleted = true;
  
          /* const user: User = {
            name: ,
            email: ,
            experience: ,
            score:
          };
  
          this.quizQuestionsService.addUserScore(this.userInfo); */
  
          // console.log(this.assessmentCompleted);
  
          if (this.assessmentCompleted) {
            // console.log('assessment completed');
            this.userInfo.push(this.assessmentScore);
  
            const user: User = {
              name: this.userInfo[0],
              email: this.userInfo[1],
              // experience: this.userInfo[2],
              role: this.userInfo[2],
              shortrole: this.userInfo[3],
              score: this.userInfo[4]
            };
  
            this.quizQuestionsService.addUserScore(user).subscribe((data) => {
              console.log(data);
            });
  
            /* this.addQuestionService.addQuestion(question).subscribe(
              (data) => console.log(data),
              (err) => {
                
              }
            ); */
          }
  
  
          // console.log(this.userInfo);
        }
      );
    }
  }

  /* getFromSession(key) {
    console.log('recived= key:' + key);
    this.questionsList[key] = this.storage.get(key);
    console.log(this.questionsList);
  } */

  /* getFromSession() {
    if (sessionStorage) {
      if (sessionStorage.getItem('quizQuestions')) {
        return JSON.parse(sessionStorage.getItem('quizQuestions'));
      } else {
        console.log('does not exist');
      }
    }
  } */

  getFromSession(whatToSearch: string) {
    if (sessionStorage) {
      if (sessionStorage.getItem(whatToSearch)) {
        return JSON.parse(sessionStorage.getItem(whatToSearch));
      } else {
        console.log('does not exist');
      }
    }
  }

}
