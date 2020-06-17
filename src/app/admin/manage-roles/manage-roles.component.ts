import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { Sort } from '@angular/material/sort';
import { Subscription } from 'rxjs';

import { Role } from 'src/app/interfaces/role';
import { RolesService } from 'src/app/service/roles.service';

import { ManageRolesModalComponent } from '../manage-roles-modal/manage-roles-modal.component';
import { ConfirmComponent } from 'src/app/shared/modals/confirm/confirm.component';

@Component({
  selector: 'app-manage-roles',
  templateUrl: './manage-roles.component.html',
  styleUrls: ['./manage-roles.component.css']
})
export class ManageRolesComponent implements OnInit {
  rolesSub: Subscription;

  roles: Role[];
  sortedRoles: Role[];

  manageRolesDialogRef: MatDialogRef<ManageRolesModalComponent>;
  confirmDialogRef: MatDialogRef<ConfirmComponent>;

  isDataUpdated: boolean = false;
  isQuestionDeleted: boolean = false;

  // dataRoles: Role[];
  displayedColumns: string[] = ['name', 'id'];

  // hide the table headers initially before any roles are fetched from the database
  showTableHeader = false;
  showTablePagination = false;

  // flag to trigger a service error if any and display a error message accordingly.
  serviceError = false;
  serviceErrorMessage;

  dataToDelete: boolean;
  roleID: string;

  constructor(
    private rolesService: RolesService,
    public matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.getRoles();
    // console.log(this.roles);
  }

  getRoles() {
    this.rolesSub = this.rolesService.getRoles().subscribe({
      next: (data) => {
        this.roles = data;

        this.sortedRoles = this.roles.slice();
      },
      error: err => this.serviceError = err,
      complete: () => {
        // console.log(this.roles);
        this.showTableHeader = true;
        this.showTablePagination = true;
      }
    })
  }

  deleteRole(roleid) {
    this.rolesService.deleteRole(roleid).subscribe({
      next: (data) => console.log(data),
      error: (err) => console.log(err),
      complete: () => this.getRoles()
    })
  }

  sortData(sort: Sort) {
    const data = this.roles.slice();

    if (!sort.active || sort.direction === '') {
      this.sortedRoles = data;
      return;
    }

    this.sortedRoles = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';

      switch (sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        // case 'calories': return compare(a.calories, b.calories, isAsc);
        // case 'fat': return compare(a.fat, b.fat, isAsc);
        // case 'carbs': return compare(a.carbs, b.carbs, isAsc);
        // case 'protein': return compare(a.protein, b.protein, isAsc);
        default: return 0;
      }
    });
  }

  openDialog(data): void {
    // configuration for the manageQuestionDialog
    const manageRolesDialogConfig = new MatDialogConfig();

    manageRolesDialogConfig.disableClose = true;
    manageRolesDialogConfig.id = 'modal-component';
    manageRolesDialogConfig.autoFocus = true;
    manageRolesDialogConfig.width = '50%';
    manageRolesDialogConfig.height = '50%';
    manageRolesDialogConfig.data = {
      // pass title and relevant question data to the modal
      modalTitle: 'Edit Roles',
      id: data._id,
      name: data.name,
      shorRole: data.shortrole
    };

    // save a reference to the opened dialog
    this.manageRolesDialogRef = this.matDialog.open(ManageRolesModalComponent, manageRolesDialogConfig);

    // subscribe to the reference opened dialog once it is closed and check for the data update value
    this.manageRolesDialogRef.afterClosed().subscribe({
      next: (updateValue) => {
        this.isDataUpdated = updateValue;

        if (this.isDataUpdated) {
          this.getRoles();
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
      modalTitle: 'Delete Role',
      queryTitle: 'Role',
      id: data._id,
      title: data.name,
    };

    // save a reference to the opened dialog
    this.confirmDialogRef = this.matDialog.open(ConfirmComponent, confirmDialogConfig);

    // subscribe to the reference opened dialog once it is closed and check for the data update value
    this.confirmDialogRef.afterClosed().subscribe({
      next: (updateValue) => {
        this.dataToDelete = updateValue.deleteData;
        this.roleID = updateValue.deleteDataId;

        if (this.dataToDelete) {
          this.deleteRole(this.roleID);
        }
      }
    })
  }

  ngOnDestroy() {
    this.rolesSub.unsubscribe();
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
