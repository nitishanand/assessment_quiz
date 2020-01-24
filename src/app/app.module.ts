import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { QuizComponent } from './quiz/quiz.component';
import { DomchangedirectiveDirective } from './domchangedirective.directive';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './shared/login/login.component';
import { StorageServiceModule } from 'angular-webstorage-service';

import { environment } from '../environments/environment';
import { AddquestionComponent } from './admin/addquestion/addquestion.component';

// Angular Material
import { MatFormFieldModule, MatInputModule, MatRadioModule, MatCardModule, MatSelectModule } from '@angular/material';

// Services
import { QuizQuestionsService } from './service/quiz-questions.service';
import { AuthService } from './service/auth.service';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EventemitterService } from './service/eventemitter.service';
import { BeginComponent } from './begin/begin.component';
import { AddrolesComponent } from './admin/addroles/addroles.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    QuizComponent,
    DomchangedirectiveDirective,
    LoginComponent,
    AddquestionComponent,
    RegisterComponent,
    NotFoundComponent,
    BeginComponent,
    AddrolesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatCardModule,
    MatSelectModule,
    StorageServiceModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [QuizQuestionsService,AuthService,EventemitterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
