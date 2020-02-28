import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizComponent } from './quiz/quiz.component';
import { LoginComponent } from './login/login.component';
import { AddquestionComponent } from './admin/addquestion/addquestion.component';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BeginComponent } from './begin/begin.component';
import { AddrolesComponent } from './admin/addroles/addroles.component';
import { ViewusersComponent } from './admin/viewusers/viewusers.component';
import { CreateuserComponent } from './createuser/createuser.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuardService } from './guards/auth-guard.service';
// import { MatFormFieldModule, MatInputModule, MatRadioModule } from '@angular/material'

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'begin',
    component: BeginComponent
  },
  {
    path: 'quiz',
    component: QuizComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'createuser',
    component: CreateuserComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'admin', children: [
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
        path: 'viewusers',
        component: ViewusersComponent,
        canActivate: [AuthGuardService]
      }
    ]
  },
  {
    path: '',
    // redirectTo: '/register',
    // pathMatch: 'full'
    component: RegisterComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
