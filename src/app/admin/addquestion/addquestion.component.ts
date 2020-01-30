import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AddQuestionService } from 'src/app/service/add-question.service';
import { Question } from 'src/app/interfaces/question';
import { RolesService } from 'src/app/service/roles.service';

@Component({
  selector: 'app-addquestion',
  templateUrl: './addquestion.component.html',
  styleUrls: ['./addquestion.component.css']
})
export class AddquestionComponent implements OnInit {
  /* questionType = [
    {value: 'single', viewValue: 'Single Selection'},
    {value: 'multiple', viewValue: 'Multipe Selection'}
  ];

  experience = [
    {value: '0', viewValue: '0'},
    {value: '1', viewValue: '1'},
    {value: '2', viewValue: '2'},
    {value: '3', viewValue: '3'},
    {value: '4', viewValue: '4'},
    {value: '5', viewValue: '5'},
    {value: '6', viewValue: '6'},
    {value: '7', viewValue: '7'},
    {value: '8', viewValue: '8'},
    {value: '9', viewValue: '9'},
    {value: '10', viewValue: '10'},
    {value: '11', viewValue: '11'},
    {value: '12', viewValue: '12'},
    {value: '13', viewValue: '13'},
    {value: '14', viewValue: '14'},
    {value: '15', viewValue: '15'},
    {value: '16', viewValue: '16'},
    {value: '17', viewValue: '17'},
    {value: '18', viewValue: '18'},
    {value: '19', viewValue: '19'},
    {value: '20', viewValue: '20'}
  ]; */

  roles: any[];

  optionsList: string[] = [];

  constructor(
    public addQuestionService: AddQuestionService,
    private rolesService: RolesService
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

    this.addQuestionService.addQuestion(question).subscribe(
      (data) => console.log(data),
      (err) => {
        
      }
    );

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
    this.rolesService.getRoles().subscribe((roles) => {
      this.roles = roles;
    });
  }

}
