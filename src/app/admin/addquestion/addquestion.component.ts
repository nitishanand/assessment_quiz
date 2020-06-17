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
      role: form.value.role,
      shortrole: shortRole
    };

    if (form.invalid) {
      return;
    }

    this.quizQuestionsService.createQuestion(question).subscribe({
      // next: data => console.log(data),
      error: err => this.error = err
    });

    // Reset the previous field text
    form.resetForm();
    this.onClearOptions();
  }

  onAddOption(option) {
    if (option.value) {
      this.optionsList.push(option.value);
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
    this.rolesSub = this.rolesService.getRoles().subscribe({
      next: roles => this.roles = roles,
      error: err => this.error = err
    });
  }

  ngOnDestroy() {
    this.rolesSub.unsubscribe();
  }

}
