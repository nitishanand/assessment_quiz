import { Component, OnInit } from '@angular/core';
import { QuizQuestionsService } from '../service/quiz-questions.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  // storage for all the questions once quiz is intialized
  questions: Array<object>;

  // currentQuestion: Array<object>;

  // store the number of active question
  activeQuestion: number = 0;

  userSelection = [];

  // variables for toggling disabled state of Next and Previous buttons
  isNextButtonDisabled = false;
  isPrevButtonDisabled = true;

  constructor(private quizQuestionsService: QuizQuestionsService) { }

  // Get list of questions once component is initialized
  ngOnInit() {
    this.quizQuestionsService.getQuestions().subscribe((res) => {
      this.questions = res;
    });
  }

  onNextQuestion() {
    // console.log('Next button clicked');

    if (!(this.activeQuestion >= this.questions.length - 1)) {
      this.activeQuestion++;
      // console.log(this.activeQuestion);
    } else {
      this.isNextButtonDisabled = true;
      return this.questions.length;
    }

    // enable the previous button if active question is greater than 1
    if (this.activeQuestion > 0) {
      this.isPrevButtonDisabled = false;
    }

    // this.isNextButtonDisabled = true;

    // on each button click check if the active question is the last question to disable next button
    this.isLastQuestion();
  }

  onPrevQuestion() {
    if (!(this.activeQuestion < 0)) {
      this.activeQuestion--;
      // console.log(this.activeQuestion);
    } else {
      this.isPrevButtonDisabled = true;
      return this.questions.length;
    }

    // enable the next button if active question is less than length of questions
    if (this.activeQuestion < this.questions.length - 1) {
      this.isNextButtonDisabled = false;
    }

    // on each button click check if the active question is the first question to disable previous button
    this.isFirstQuestion();
    
    this.onPopulateOptions();
  }

  isFirstQuestion() {
    if (this.activeQuestion === 0) {
      // console.log('This is first question');
      this.isPrevButtonDisabled = true;
    }
  }

  isLastQuestion() {
    if (this.activeQuestion === this.questions.length - 1) {
      // console.log('This is last question');
      this.isNextButtonDisabled = true;
    }
  }

  onOptionChange(el) {
    if (this.userSelection.length) {
      this.userSelection[this.activeQuestion] = +el.target.id;
    } else {
      this.userSelection.push(+el.target.id);
    }

    // this.isNextButtonDisabled = false;

    console.log(this.userSelection);
  }

  onPopulateOptions() {
    // document.getElementById(this.activeQuestion).setAttribute('checked', true);
    console.log(document.getElementById(this.userSelection[this.activeQuestion]));
  }

}
