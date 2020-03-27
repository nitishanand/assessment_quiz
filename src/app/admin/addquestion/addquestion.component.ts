import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Question } from 'src/app/interfaces/question';
import { RolesService } from 'src/app/service/roles.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { QuizQuestionsService } from 'src/app/service/quiz-questions.service';

@Component({
  selector: 'app-addquestion',
  templateUrl: './addquestion.component.html',
  styleUrls: ['./addquestion.component.css']
})
export class AddquestionComponent implements OnInit {
  roles: any[];

  optionsList: string[] = [];

  // store reference to the subscription
  addQuestionSub: Subscription;
  rolesSub: Subscription;
  error: any;

  constructor(
    public quizQuestionsService: QuizQuestionsService,
    private rolesService: RolesService,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.getRoles();
  }

  onAddQuestion(form: NgForm) {
    let shortRole = form.value.role.replace(/\s/g, "");

    const question: Question = {
      title: form.value.title,
      options: this.optionsList,
      answer: form.value.answer,
      /* min_exp: form.value.min_exp,
      max_exp: form.value.max_exp,
      question_type: form.value.question_type */
      role: form.value.role,
      shortrole: shortRole
    };

    if (form.invalid) {
      return;
    }

    /* this.quizQuestionsService
      .createQuestion(question)
      .subscribe({}
        data => console.log(data),
        err => this.error = err
      ); */

    this.quizQuestionsService.createQuestion(question).subscribe({
      next: data => console.log(data),
      error: err => this.error = err
    });

    // console.log(form.value.title);

    // Reset the previous field text
    form.resetForm();
    this.onClearOptions();
  }

  onAddOption(option) {
    // option.preventDefault();

    // console.log(option.value);

    if (option.value) {
      this.optionsList.push(option.value);
      // console.log('Add button clicked!');
      // console.log(this.optionsList);
      option.reset();
    }
  }

  onRemoveOption(index) {
    this.optionsList.splice(index, 1);
  }

  onClearOptions() {
    this.optionsList = [];
  }

  getRoles() {
    /* this.rolesSub = this.rolesService
      .getRoles()
      .subscribe(
        roles => this.roles = roles,
        err => this.error = err
      ); */

    this.rolesSub = this.rolesService.getRoles().subscribe({
      next: roles => this.roles = roles,
      error: err => this.error = err
    });
  }

  ngOnDestroy() {
    this.addQuestionSub.unsubscribe();
    this.rolesSub.unsubscribe();
  }

}
