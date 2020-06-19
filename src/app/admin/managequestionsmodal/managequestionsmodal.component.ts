import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { QuizQuestionsService } from '../../service/quiz-questions.service';

interface DialogData {
  id: number;
  modalTitle: string;
  email: string;
  title: string;
  questionOptions: string[];
  answer: string;
  role: string;
  shortrole: string;
  roles: string[];
}

@Component({
  selector: 'app-modal',
  templateUrl: './managequestionsmodal.component.html',
  styleUrls: ['./managequestionsmodal.component.css']
})
export class ManageQuestionsModalComponent implements OnInit {
  questionId: number;
  modalTitle: string;
  title: string;
  options: string[];
  answer: string;
  // role: string;
  shortrole: string;
  roleOptions: string[];

  userSelectedRole: string;

  isQuestionUpdated: boolean = false;

  // updateform and question options array
  questionUpdateForm: FormGroup;
  questionControlsArray = new FormArray([]);

  constructor(
    public quizQuestionsService: QuizQuestionsService,
    public dialogRef: MatDialogRef<ManageQuestionsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public modalData: DialogData
  ) {
    // get the title from component where modal is used
    this.questionId = modalData.id;
    this.modalTitle = modalData.modalTitle;
    this.title = modalData.title;
    this.options = modalData.questionOptions;
    this.answer = modalData.answer;
    this.userSelectedRole = modalData.role;
    this.shortrole = modalData.shortrole;
    this.roleOptions = modalData.roles;
  }

  ngOnInit() {
    this.questionUpdateForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(5)]),
      answer: new FormControl('', [Validators.required, Validators.minLength(5)]),
      role: new FormControl(''),
      // roleoptions: new FormControl('')
    });

    let optionsLoopInit = 0;

    while(optionsLoopInit < this.options.length) {
      this.questionControlsArrayItem(this.options[optionsLoopInit]);
      optionsLoopInit++;
    }
  }

  onRoleSelectionChange() {
    this.userSelectedRole = this.shortrole;
  }

  onCancel() {
    // this.isQuestionUpdated = false;
    this.dialogRef.close(this.isQuestionUpdated);
  }

  updateQuestion(questionId, questionFormValue) {
    /* let updatedOptions: string[] = [];
    let initValue = 0;

    while(initValue < this.questionControlsArray.controls.length) {
      updatedOptions.push(this.questionControlsArray.controls[initValue].value);
      initValue++;
    }

    questionFormValue.options = updatedOptions;
    questionFormValue.shortrole = this.shortrole;

    if (this.questionUpdateForm.valid) {
      this.quizQuestionsService.updateQuestion(questionId, questionFormValue).subscribe({
        next: (data) => {
          this.isQuestionUpdated = true;
          this.dialogRef.close(this.isQuestionUpdated);
        },
        error: (err) => {
          console.log(err);
        }
      });
    } */

    if (this.questionUpdateForm.valid) {
      console.log(this.questionUpdateForm.value);
    }
  }

  questionControlsArrayItem(value): void {
    this.questionControlsArray.push(new FormControl(value));
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.questionUpdateForm.controls[controlName].hasError(errorName);
  }
}
