import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { QuizComponent } from './quiz/quiz.component';
import { DomchangedirectiveDirective } from './domchangedirective.directive';
import { AppRoutingModule } from './app-routing.module';
import { StorageServiceModule } from 'angular-webstorage-service';

import { environment } from '../environments/environment';
import { AddquestionComponent } from './admin/addquestion/addquestion.component';

// Services
import { QuizQuestionsService } from './service/quiz-questions.service';
import { AuthService } from './service/auth.service';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EventemitterService } from './service/eventemitter.service';
import { BeginComponent } from './begin/begin.component';
import { AddrolesComponent } from './admin/addroles/addroles.component';
import { ViewusersComponent } from './admin/viewusers/viewusers.component';
import { ConnectionService } from 'ng-connection-service';
import { ToastrModule } from 'ngx-toastr';
import { CreateuserComponent } from './createuser/createuser.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { ManageQuestionsComponent } from './admin/manage-questions/manage-questions.component';
import { InterceptorService } from './service/interceptor.service';
import { LoaderComponent } from './shared/loader/loader.component';
import { LoaderService } from './service/loader.service';
import { ModalComponent } from './modal/modal.component';

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
    AddrolesComponent,
    ViewusersComponent,
    CreateuserComponent,
    ProfileComponent,
    ManageQuestionsComponent,
    LoaderComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    StorageServiceModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ToastrModule.forRoot()
  ],
  providers: [QuizQuestionsService,AuthService,EventemitterService,ConnectionService,AuthGuardService,LoaderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent]
})
export class AppModule { }
