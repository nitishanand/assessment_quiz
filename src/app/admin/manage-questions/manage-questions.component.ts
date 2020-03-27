import { Component, OnInit } from '@angular/core';
import { QuizQuestionsService } from 'src/app/service/quiz-questions.service';
import { Question } from 'src/app/interfaces/question';
import { Role } from 'src/app/interfaces/role';
import { Subscription } from 'rxjs';
import { RolesService } from 'src/app/service/roles.service';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ModalComponent } from 'src/app/modal/modal.component';

interface DialogData {
  email: string;
}

@Component({
  selector: 'app-manage-questions',
  templateUrl: './manage-questions.component.html',
  styleUrls: ['./manage-questions.component.css']
})
export class ManageQuestionsComponent implements OnInit {
  rolesSub: Subscription;

  quizQuestions: Question[];

  displayedColumns: string[] = ['title', 'options', 'answer', 'id'];

  // flag to trigger a service error if any and display a error message accordingly.
  serviceError = false;
  serviceErrorMessage;

  roles: Role[];

  userSelectedRole: string;

  showTableHeader = false;

  email: string;

  constructor(
    public quizQuestionsService: QuizQuestionsService,
    public rolesService: RolesService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getRoles();

    
  }

  getRoles() {
    this.rolesSub = this.rolesService.getRoles().subscribe({
      next: roles => this.roles = roles,
      error: err => this.serviceError = err
    });
  }

  onRoleSelectionChange() {
    // console.log(this.userSelectedRole);
    /* this.quizQuestionsService.getQuestions(this.userSelectedRole).subscribe(
      (data) => {
        this.quizQuestions = data;
        console.log(this.quizQuestions);
      },
      (err) => {
        this.serviceError = true;
        this.serviceErrorMessage = 'There is a problem fetching questions from the database. Kindly try again later.';
      }
    ); */

    this.quizQuestionsService.getQuestions(this.userSelectedRole).subscribe({
      next: (data) => {
        this.quizQuestions = data;

        console.log(this.quizQuestions);
      },
      error: (err) => {
        this.serviceError = true;
        this.serviceErrorMessage = 'There is a problem fetching questions from the database. Kindly try again later.';
      },
      complete: () => this.showTableHeader = true
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '300px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.email = result;
    });
  }

}
