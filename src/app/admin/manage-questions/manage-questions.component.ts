import { Component, OnInit } from '@angular/core';
import { QuizQuestionsService } from 'src/app/service/quiz-questions.service';
import { Question } from 'src/app/interfaces/question';
import { Role } from 'src/app/interfaces/role';
import { Subscription } from 'rxjs';
import { RolesService } from 'src/app/service/roles.service';

import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
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

  displayedColumns: string[] = ['title', 'options', 'answer', 'id'];

  // flag to trigger a service error if any and display a error message accordingly.
  serviceError = false;
  serviceErrorMessage;

  roles: Role[];

  userSelectedRole: string;

  // hide the table headers initially before any roles are fetched from the database
  showTableHeader = false;

  // @ViewChild(MatSort) sort: MatSort;

  // email: string;

  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent: PageEvent;

  manageQuestionsDialogRef: MatDialogRef<ModalComponent>;

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
      complete: () => this.showTableHeader = true
    });
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
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.height = '90%';
    dialogConfig.data = {
      // pass title and relevant question data to the modal
      modalTitle: 'Edit Question',
      id: data._id,
      title: data.title,
      questionOptions: data.options,
      answer: data.answer,
      role: data.role
    };

    // save a reference to the opened dialog
    this.manageQuestionsDialogRef = this.matDialog.open(ModalComponent, dialogConfig);

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
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
