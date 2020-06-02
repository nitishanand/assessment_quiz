import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
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
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  questionId: number;
  modalTitle: string;
  title: string;
  options: string[];
  answer: string;
  role: string;

  isQuestionUpdated: boolean = false;

  // updateform and question options array
  questionUpdateForm: FormGroup;
  questionControlsArray = new FormArray([]);

  constructor(
    public quizQuestionsService: QuizQuestionsService,
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public modalData: DialogData
  ) {
    // get the title from component where modal is used
    this.questionId = modalData.id;
    this.modalTitle = modalData.modalTitle;
    this.title = modalData.title;
    this.options = modalData.questionOptions;
    this.answer = modalData.answer;
    this.role = modalData.role;
  }

  ngOnInit() {
    this.questionUpdateForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(5)]),
      answer: new FormControl(''),
      role: new FormControl('')
    });

    let loopInit = 0;

    while(loopInit < this.options.length) {
      this.questionControlsArrayItem(this.options[loopInit]);
      loopInit++;
    }
  }

  onCancel() {
    // this.isQuestionUpdated = false;
    this.dialogRef.close(this.isQuestionUpdated);
  }

  updateQuestion(questionId, questionFormValue) {
    let updatedOptions: string[] = [];
    let initValue = 0;

    while(initValue < this.questionControlsArray.controls.length) {
      updatedOptions.push(this.questionControlsArray.controls[initValue].value);
      initValue++;
    }

    questionFormValue.options = updatedOptions;

    if (this.questionUpdateForm.valid) {
      this.quizQuestionsService.updateQuestion(questionId, questionFormValue).subscribe({
        next: (data) => {
          // this.dialogRef.componentInstance.isQuestionUpdated = true;
          this.isQuestionUpdated = true;
          this.dialogRef.close(this.isQuestionUpdated);
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }

  questionControlsArrayItem(value): void {
    this.questionControlsArray.push(new FormControl(value));
  }
}
