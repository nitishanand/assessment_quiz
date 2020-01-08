import { Component, OnInit, Output } from '@angular/core';
import { Question } from '../interfaces/question';
import { QuizQuestionsService } from '../service/quiz-questions.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  // @Output() userScore = new EventEmitter<number>();

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

  constructor(private quizQuestionsService: QuizQuestionsService) { }

  // Get list of questions once component is initialized
  ngOnInit() {
    this.quizQuestionsService.getQuestions().subscribe((res) => {
      this.questionsList = res;

      /* for (let i = 0; i < this.questionsList.length; i++) {
        this.answersList.push(this.questionsList[i].answer);
      } */
    });

    /* this.quizQuestionsService.getAnswers().subscribe((res) => {
      // this.answersList = res;

      for (let i = 0; i < res.length; i++) {
        this.answersList.push(res[i].answer);
      }
    });

    // console.log(this.answersList); */
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

    this.quizQuestionsService.getAnswers().subscribe(
      (res) => {
      // this.answersList = res;

      for (let i = 0; i < res.length; i++) {
        this.answersList.push(res[i].answer);
      }
    },
    (err) => {
      console.error(err);
    },
    () => {
      for (let i = 0; i < this.questionsList.length; i++) {
        if (this.userSelectionAnswerArray[i] === this.answersList[i]) {
          this.assessmentScore += 1;
        }
      }

      this.assessmentCompleted = true;
    });
  }

}
