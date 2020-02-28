import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/interfaces/role';
import { NgForm } from '@angular/forms';
import { AddRoleService } from 'src/app/service/add-role.service';
import { RolesService } from 'src/app/service/roles.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-addroles',
  templateUrl: './addroles.component.html',
  styleUrls: ['./addroles.component.css']
})
export class AddrolesComponent implements OnInit {
  rolesLoaded = false;
  availableRoles;

  // store reference to the subscription
  rolesSub: Subscription;
  error: any;

  // flag to trigger a service error if any and display a error message accordingly.
  serviceError = false;
  serviceErrorMessage;

  constructor(
    private addRoleService: AddRoleService,
    private rolesService: RolesService,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.rolesSub = this.rolesService
      .getRoles()
      .subscribe(
        roles => this.availableRoles = roles,
        err => this.error = err,
        () => {
          this.rolesLoaded = true;
        }
      );
  }

  onAddRole(form: NgForm) {
    let shortName = form.value.role.replace(/\s/g, "");

    const role: Role = {
      name: form.value.role,
      shortrole: shortName
    };

    if (form.invalid) {
      return;
    }

    this.addRoleService
      .addRole(role)
      .subscribe(
        data => console.log(data),
        err => {
          this.serviceErrorMessage = err;
        }
      );

    // Reset the previous field text
    form.resetForm();
  }

  ngOnDestroy() {
    this.rolesSub.unsubscribe();
  }

}
