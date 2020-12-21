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
  dataId: number;
  title: string;

  isDataToDelete: boolean = false;

  constructor(
    public quizQuestionsService: QuizQuestionsService,
    public dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public modalData
  ) {
    this.dataId = modalData.id;
    this.modalTitle = modalData.modalTitle;
    this.queryTitle = modalData.queryTitle;
    this.title = modalData.title;
  }

  ngOnInit() {
  }

  deleteData(id): void {
    this.isDataToDelete = true;
    
    this.dialogRef.close({deleteData: this.isDataToDelete, deleteDataId: id});
  }

  onCancel(): void {
    this.dialogRef.close({deleteData: this.isDataToDelete});
  }

}
