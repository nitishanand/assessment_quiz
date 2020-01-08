import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizComponent } from './quiz/quiz.component';
import { LoginComponent } from './shared/login/login.component';
import { AddquestionComponent } from './admin/addquestion/addquestion.component';
// import { MatFormFieldModule, MatInputModule, MatRadioModule } from '@angular/material'

const routes: Routes = [
  {
    path: 'questions',
    component: QuizComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'addquestion',
    component: AddquestionComponent
  },
  {
    path: '',
    // redirectTo: '/login',
    redirectTo: '/questions',
    pathMatch: 'full'
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
