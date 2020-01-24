import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/interfaces/role';
import { NgForm } from '@angular/forms';
import { AddRoleService } from 'src/app/service/add-role.service';
import { RolesService } from 'src/app/service/roles.service';

@Component({
  selector: 'app-addroles',
  templateUrl: './addroles.component.html',
  styleUrls: ['./addroles.component.css']
})
export class AddrolesComponent implements OnInit {
  availableRoles;

  constructor(
    private addRoleService: AddRoleService,
    private rolesService: RolesService
  ) { }

  ngOnInit() {
    this.rolesService.getRoles().subscribe((roles) => {
      this.availableRoles = roles;
    });
  }

  onAddRole(form: NgForm) {
    const role: Role = {
      name: form.value.role
    };

    if (form.invalid) {
      return;
    }

    this.addRoleService.addRole(role).subscribe(
      (data) => console.log(data),
      (err) => {

      }
    );

    // Reset the previous field text
    form.resetForm();
  }

}
