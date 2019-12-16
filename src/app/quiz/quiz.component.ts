import { Component, OnInit } from '@angular/core';
import { Question } from '../interfaces/question';
import { QuizQuestionsService } from '../service/quiz-questions.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  // storage for all the questions once quiz is intialized
  questionsList: Question[] = [];

  // currentQuestion: Array<object>;

  // store the number of active question
  activeQuestion: number = 0;

  userSelectionArray = [];

  // variables for toggling disabled state of Next and Previous buttons
  isNextButtonDisabled = true;
  isPrevButtonDisabled = true;
  // isNextButtonVisible = true;
  isSubmitButtonVisible = false;

  constructor(private quizQuestionsService: QuizQuestionsService) { }

  // Get list of questions once component is initialized
  ngOnInit() {
    this.quizQuestionsService.getQuestions().subscribe((res) => {
      this.questionsList = res;
    });
  }

  onNextQuestion() {
    if (!(this.activeQuestion >= this.questionsList.length - 1)) {
      this.activeQuestion++;
      setTimeout(() => this.onPopulateOptions(this.userSelectionArray, this.activeQuestion), 100);
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
      setTimeout(() => this.onPopulateOptions(this.userSelectionArray, this.activeQuestion), 100);
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
      console.log('First question');
      this.isPrevButtonDisabled = true;
    }
  }

  isLastQuestion() {
    if (this.activeQuestion === this.questionsList.length - 1) {
      console.log('Last question');
      this.isNextButtonDisabled = true;

      // this.isNextButtonVisible = false;
      // this.isSubmitButtonVisible = true;
    }
  }

  onOptionChange(el) {
    if (!(this.activeQuestion === this.questionsList.length)) {
      console.log(this.userSelectionArray.length);
      if (this.userSelectionArray.length) {
        this.userSelectionArray[this.activeQuestion] = +el.target.id;
      } else {
        this.userSelectionArray.push(+el.target.id);
      }

      this.isNextButtonDisabled = false;
    }

    console.log(this.activeQuestion);
    if (this.activeQuestion === this.questionsList.length - 1) {
      this.isNextButtonDisabled = true;
      this.isSubmitButtonVisible = true;
    }

    console.log(this.userSelectionArray);
  }

  onPopulateOptions(userAnswer, activeQuestion) {
    let target = <HTMLCollection> document.getElementsByClassName('option-list');
    let optionList = target[0].children;
    let input;

    if (this.userSelectionArray[this.activeQuestion] >= 0) {
      // console.log(this.userSelectionArray[this.activeQuestion]);
      input = optionList[this.userSelectionArray[this.activeQuestion]].children[0] as HTMLInputElement;

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

  }

}
