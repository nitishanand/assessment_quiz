import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { QuizQuestionsService } from 'src/app/service/quiz-questions.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  modalTitle: string;
  queryTitle: string;
  questionId: number;
  title: string;

  isQuestionDeleted: boolean = false;

  constructor(
    public quizQuestionsService: QuizQuestionsService,
    public dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public modalData
  ) {
    this.questionId = modalData.id;
    this.modalTitle = modalData.modalTitle;
    this.queryTitle = modalData.queryTitle;
    this.title = modalData.title;
  }

  ngOnInit() {
  }

  /* deleteQuestion(questionId) {
    this.quizQuestionsService.deleteQuestion(questionId).subscribe({
      next: (data) => {
        // console.log(data);
        this.isQuestionDeleted = true;
        this.dialogRef.close(this.isQuestionDeleted);
      },
      error: (err) => {
        console.log(err);
      }
    })
  } */
  
  deleteQuestion(questionId): void {
    let roleToDelete = questionId;
    this.isQuestionDeleted = true;
    
    this.dialogRef.close({deleteData: this.isQuestionDeleted, deleteDataId: roleToDelete});
  }

  onCancel(): void {
    this.dialogRef.close({deleteData: this.isQuestionDeleted});
  }

}
