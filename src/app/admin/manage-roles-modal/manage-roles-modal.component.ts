import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RolesService } from 'src/app/service/roles.service';

@Component({
  selector: 'app-manage-roles-modal',
  templateUrl: './manage-roles-modal.component.html',
  styleUrls: ['./manage-roles-modal.component.css']
})
export class ManageRolesModalComponent implements OnInit {
  roleId: number;
  modalTitle: string;
  name: string;
  shortRole: string;

  isRoleUpdated: boolean = false;

  roleUpdateForm;
  
  constructor(
    public dialogRef: MatDialogRef<ManageRolesModalComponent>,
    private fb: FormBuilder,
    private rolesService: RolesService,
    @Inject(MAT_DIALOG_DATA) public modalData
  ) {
    this.roleId = modalData.id;
    this.modalTitle = modalData.modalTitle;
    this.name = modalData.name;
    this.shortRole = modalData.shortRole;
  }

  ngOnInit() {
    this.roleUpdateForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
    })
  }

  updateRole(roleId, roleUpdateFormValue) {
    let updatedOptions: string[] = [];
    let initValue = 0;

    let shortRole = roleUpdateFormValue.name.replace(/\s/g, "");

    roleUpdateFormValue.shortrole = shortRole;

    if (this.roleUpdateForm.valid) {
      this.rolesService.updateRole(roleId, roleUpdateFormValue).subscribe({
        next: (data) => {
          console.log(data);
          // this.dialogRef.componentInstance.isRoleUpdated = true;
          this.isRoleUpdated = true;
          this.dialogRef.close(this.isRoleUpdated);
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }

  get roleUpdateFormControl() {
    return this.roleUpdateForm.controls;
  }

  onCancel() {
    // this.isRoleUpdated = false;
    this.dialogRef.close(this.isRoleUpdated);
  }

}
