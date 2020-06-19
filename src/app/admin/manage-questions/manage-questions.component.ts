import { Component, OnInit } from '@angular/core';
import { QuizQuestionsService } from 'src/app/service/quiz-questions.service';
import { Question } from 'src/app/interfaces/question';
import { Role } from 'src/app/interfaces/role';
import { Subscription } from 'rxjs';
import { RolesService } from 'src/app/service/roles.service';

import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';
import { ManageQuestionsModalComponent } from 'src/app/admin/managequestionsmodal/managequestionsmodal.component';
import { ConfirmComponent } from 'src/app/shared/modals/confirm/confirm.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-manage-questions',
  templateUrl: './manage-questions.component.html',
  styleUrls: ['./manage-questions.component.css']
})
export class ManageQuestionsComponent implements OnInit {
  rolesSub: Subscription;

  quizQuestions: Question[];
  sortedQuizQuestions: Question[];

  isDataUpdated: boolean = false;
  isQuestionDeleted: boolean = false;

  displayedColumns: string[] = ['title', 'options', 'answer', 'id'];

  // flag to trigger a service error if any and display a error message accordingly.
  serviceError = false;
  serviceErrorMessage;

  roles: Role[];

  userSelectedRole: string;

  // hide the table headers initially before any roles are fetched from the database
  showTableHeader = false;
  showTablePagination = false;

  dataToDelete: boolean;
  roleID: string;

  // @ViewChild(MatSort) sort: MatSort;

  // email: string;

  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent: PageEvent;

  manageQuestionsDialogRef: MatDialogRef<ManageQuestionsModalComponent>;
  confirmDialogRef: MatDialogRef<ConfirmComponent>;

  constructor(
    public quizQuestionsService: QuizQuestionsService,
    public rolesService: RolesService,
    public matDialog: MatDialog
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
    this.fetchRoleData(this.userSelectedRole);
  }

  fetchRoleData(role) {
    this.quizQuestionsService.getQuestions(role).subscribe({
      next: (data) => {
        this.quizQuestions = data;

        this.sortedQuizQuestions = this.quizQuestions.slice();
      },
      error: (err) => {
        this.serviceError = true;
        this.serviceErrorMessage = 'There is a problem fetching questions from the database. Kindly try again later.';
      },
      complete: () => {
        this.showTableHeader = true;
        this.showTablePagination = true;
      }
    });
  }

  deleteQuestion(roleid) {
    this.quizQuestionsService.deleteQuestion(roleid).subscribe({
      next: (data) => console.log(data),
      error: (err) => console.log(err),
      complete: () => {
        this.fetchRoleData(this.userSelectedRole);
      }
    })
  }

  sortData(sort: Sort) {
    const data = this.quizQuestions.slice();
    
    if (!sort.active || sort.direction === '') {
      this.sortedQuizQuestions = data;
      return;
    }

    this.sortedQuizQuestions = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';

      switch (sort.active) {
        case 'title': return compare(a.title, b.title, isAsc);
        // case 'calories': return compare(a.calories, b.calories, isAsc);
        // case 'fat': return compare(a.fat, b.fat, isAsc);
        // case 'carbs': return compare(a.carbs, b.carbs, isAsc);
        // case 'protein': return compare(a.protein, b.protein, isAsc);
        default: return 0;
      }
    });
  }
  
  pageSizeChange(pageEvent) {
    console.log(pageEvent);
  }

  openDialog(data): void {
    // configuration for the manageQuestionDialog
    const manageQuestionsDialogConfig = new MatDialogConfig();

    manageQuestionsDialogConfig.disableClose = true;
    manageQuestionsDialogConfig.id = 'modal-component';
    manageQuestionsDialogConfig.autoFocus = true;
    manageQuestionsDialogConfig.width = '50%';
    manageQuestionsDialogConfig.height = '90%';
    manageQuestionsDialogConfig.data = {
      // pass title and relevant question data to the modal
      modalTitle: 'Edit Question',
      id: data._id,
      title: data.title,
      questionOptions: data.options,
      answer: data.answer,
      role: data.role,
      shortrole: data.shortrole,
      roles: this.roles
    };

    // save a reference to the opened dialog
    this.manageQuestionsDialogRef = this.matDialog.open(ManageQuestionsModalComponent, manageQuestionsDialogConfig);

    // subscribe to the reference opened dialog once it is closed and check for the data update value
    this.manageQuestionsDialogRef.afterClosed().subscribe({
      next: (updateValue) => {
        this.isDataUpdated = updateValue;

        if (this.isDataUpdated) {
          this.fetchRoleData(this.userSelectedRole);
        }
      }
    })
  }

  openConfirmDialog(data): void {
    // configuration for the confirmDialog
    const confirmDialogConfig = new MatDialogConfig();

    confirmDialogConfig.disableClose = true;
    confirmDialogConfig.id = 'modal-component';
    confirmDialogConfig.autoFocus = true;
    confirmDialogConfig.width = '50%';
    confirmDialogConfig.height = '50%';
    confirmDialogConfig.data = {
      // pass title and relevant question data to the modal
      modalTitle: 'Delete Question',
      queryTitle: 'Question',
      id: data._id,
      title: data.title,
    };

    // save a reference to the opened dialog
    this.confirmDialogRef = this.matDialog.open(ConfirmComponent, confirmDialogConfig);

    // subscribe to the reference opened dialog once it is closed and check for the data update value
    this.confirmDialogRef.afterClosed().subscribe({
      next: (updateValue) => {
        /* this.isDataUpdated = updateValue;

        if (this.isDataUpdated) {
          this.fetchRoleData(this.userSelectedRole);
        } */
        this.dataToDelete = updateValue.deleteData;
        this.roleID = updateValue.deleteDataId;

        if (this.dataToDelete) {
          this.deleteQuestion(this.roleID);
        }
      }
    })
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
