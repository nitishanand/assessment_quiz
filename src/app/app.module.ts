import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { QuizComponent } from './quiz/quiz.component';
import { DomchangedirectiveDirective } from './domchangedirective.directive';
import { AppRoutingModule } from './app-routing.module';
import { QuizQuestionsService } from './service/quiz-questions.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    QuizComponent,
    DomchangedirectiveDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [QuizQuestionsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
