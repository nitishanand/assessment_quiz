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
import { QuizQuestionsService } from './service/quiz-questions.service';
import { LoginComponent } from './shared/login/login.component';

import { environment } from '../environments/environment';
import { AddquestionComponent } from './admin/addquestion/addquestion.component';

import { MatFormFieldModule, MatInputModule, MatRadioModule, MatCardModule, MatSelectModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    QuizComponent,
    DomchangedirectiveDirective,
    LoginComponent,
    AddquestionComponent
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
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [QuizQuestionsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
