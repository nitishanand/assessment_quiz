import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizComponent } from './quiz/quiz.component';
import { LoginComponent } from './shared/login/login.component';
import { AddquestionComponent } from './admin/addquestion/addquestion.component';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BeginComponent } from './begin/begin.component';
import { AddrolesComponent } from './admin/addroles/addroles.component';
import { ViewusersComponent } from './admin/viewusers/viewusers.component';
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
    path: 'admin', children: [
      {
        path: 'addquestion',
        component: AddquestionComponent
      },
      {
        path: 'addrole',
        component: AddrolesComponent
      },
      {
        path: 'viewusers',
        component: ViewusersComponent
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
