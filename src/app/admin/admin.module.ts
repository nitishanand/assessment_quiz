import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { AddquestionComponent } from './addquestion/addquestion.component';
import { AddrolesComponent } from './addroles/addroles.component';
import { ManageQuestionsComponent } from './manage-questions/manage-questions.component';
import { ViewusersComponent } from './viewusers/viewusers.component';
import { LoginComponent } from '../login/login.component';
import { MaterialModule } from '../material.module';
import { AdminComponent } from './admin/admin.component';

// Modal
import { ManageQuestionsModalComponent } from './managequestionsmodal/managequestionsmodal.component';
import { ManageRolesComponent } from './manage-roles/manage-roles.component';
import { ManageRolesModalComponent } from './manage-roles-modal/manage-roles-modal.component';

@NgModule({
  declarations: [
    AddquestionComponent,
    AddrolesComponent,
    ManageQuestionsComponent,
    ViewusersComponent,
    LoginComponent,
    AdminComponent,
    ManageQuestionsModalComponent,
    ManageRolesComponent,
    ManageRolesModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    MaterialModule
  ],
  entryComponents: [ManageQuestionsModalComponent, ManageRolesModalComponent]
})
export class AdminModule { }
