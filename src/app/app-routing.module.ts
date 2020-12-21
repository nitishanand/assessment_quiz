import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components
import { QuizComponent } from './quiz/quiz.component';
// import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BeginComponent } from './begin/begin.component';
import { CreateuserComponent } from './createuser/createuser.component';
import { ProfileComponent } from './profile/profile.component';
import { VerifyuserComponent } from './verifyuser/verifyuser.component';

// service(s)
import { AuthGuardService } from './guards/auth-guard.service';

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
  /* {
    path: 'login',
    component: LoginComponent
  }, */
  {
    path: 'createuser',
    component: CreateuserComponent
  },
  {
    path: 'verifyuser',
    component: VerifyuserComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: '',
    // redirectTo: '/register',
    // pathMatch: 'full'
    component: RegisterComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
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
export const AppRoutingComponents = [RegisterComponent, BeginComponent, QuizComponent, CreateuserComponent, VerifyuserComponent, ProfileComponent];
