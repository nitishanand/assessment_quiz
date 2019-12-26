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
  @Output() userScore = new EventEmitter<number>();
  
  // storage for all the questions once quiz is intialized
  questionsList: Question[] = [];
  answersList: string[] = [];

  // currentQuestion: Array<object>;

  // store the number of active question
  activeQuestion: number = 0;

  userSelectionOptionArray = [];
  userSelectionAnswerArray = [];

  // variables for toggling disabled state of Next and Previous buttons
  isNextButtonDisabled = true;
  isPrevButtonDisabled = true;
  // isNextButtonVisible = true;
  isSubmitButtonVisible = false;

  assessmentScore = 0;
  assessmentCompleted = false;

  constructor(private quizQuestionsService: QuizQuestionsService) { }

  // Get list of questions once component is initialized
  ngOnInit() {
    this.quizQuestionsService.getQuestions().subscribe((res) => {
      this.questionsList = res;

      for (let i = 0; i < this.questionsList.length; i++) {
        this.answersList.push(this.questionsList[i].answer);
      }

      // console.log(this.answersList);
    });


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
      // console.log('First question');
      this.isPrevButtonDisabled = true;
    }
  }

  isLastQuestion() {
    if (this.activeQuestion === this.questionsList.length - 1) {
      // console.log('Last question');
      this.isNextButtonDisabled = true;

      // this.isNextButtonVisible = false;
      // this.isSubmitButtonVisible = true;
    }
  }

  onOptionChange(el) {
    if (!(this.activeQuestion === this.questionsList.length)) {
      // console.log(this.userSelectionOptionArray.length);
      if (this.userSelectionOptionArray.length) {
        this.userSelectionOptionArray[this.activeQuestion] = +el.target.id;
        this.userSelectionAnswerArray[this.activeQuestion] = el.target.value;
      } else {
        this.userSelectionOptionArray.push(+el.target.id);
        this.userSelectionAnswerArray.push(el.target.value);
      }

      this.isNextButtonDisabled = false;
    }

    // console.log(this.activeQuestion);
    if (this.activeQuestion === this.questionsList.length - 1) {
      this.isNextButtonDisabled = true;
      this.isSubmitButtonVisible = true;
    }

    // console.log(this.answersList);
    /* console.log(this.userSelectionOptionArray);
    console.log(this.userSelectionAnswerArray); */
  }

  onPopulateOptions(userAnswer, activeQuestion) {
    let target = <HTMLCollection> document.getElementsByClassName('option-list');
    let optionList = target[0].children;
    let input;

    if (this.userSelectionOptionArray[this.activeQuestion] >= 0) {
      // console.log(this.userSelectionOptionArray[this.activeQuestion]);
      input = optionList[this.userSelectionOptionArray[this.activeQuestion]].children[0] as HTMLInputElement;

      input.checked = true;

      if (input.checked) {
        // console.log('already visited');

        this.isNextButtonDisabled = false;
      }
    }

    if (this.activeQuestion === this.questionsList.length - 1) {
      this.isNextButtonDisabled = true;
    }
  }

  onSubmitQuiz() {
    let assessmentScoreArray: any[] = [];
    // let assessmentScore = 0;

    for (let i = 0; i < this.questionsList.length; i++) {
      if (this.userSelectionAnswerArray[i] === this.answersList[i]) {
        this.assessmentScore += 1;
      }
    }

    this.assessmentCompleted = true;
    // this.userScore.emit(assessmentScore);

    // console.log(assessmentScore);
  }

}
