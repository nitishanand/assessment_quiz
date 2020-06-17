import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AddquestionComponent } from './addquestion/addquestion.component';
import { AuthGuardService } from '../guards/auth-guard.service';
import { AddrolesComponent } from './addroles/addroles.component';
import { ViewusersComponent } from './viewusers/viewusers.component';
import { ManageQuestionsComponent } from './manage-questions/manage-questions.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { LoginComponent } from '../login/login.component';
import { ManageRolesComponent } from './manage-roles/manage-roles.component';

// https://www.djamware.com/post/5d58b409bcc156d4a8a3df8f/angular-8-tutorial-routing-navigation-example
const routes: Routes = [
  {
    path: 'admin', component: AdminComponent, children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'addquestion',
        component: AddquestionComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'addrole',
        component: AddrolesComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'manageroles',
        component: ManageRolesComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'viewusers',
        component: ViewusersComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'managequestions',
        component: ManageQuestionsComponent,
        canActivate: [AuthGuardService]
      },
      /* {
        path: '',
        redirectTo: ''
      }, */
      {
        path: '**',
        component: PageNotFoundComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
