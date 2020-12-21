import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// modules
import { AdminRoutingModule, AdminRoutingComponents } from './admin-routing.module';
import { MaterialModule } from '../material.module';

// Modal
import { ManageQuestionsModalComponent } from './managequestionsmodal/managequestionsmodal.component';
import { ManageRolesModalComponent } from './manage-roles-modal/manage-roles-modal.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ManageQuestionsModalComponent,
    ManageRolesModalComponent,
    AdminRoutingComponents
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    MaterialModule,
    SharedModule
  ],
  entryComponents: [ManageQuestionsModalComponent, ManageRolesModalComponent]
})
export class AdminModule { }
