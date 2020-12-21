import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MaterialModule } from './material.module';

import { DomchangedirectiveDirective } from './domchangedirective.directive';
import { AppRoutingModule, AppRoutingComponents } from './app-routing.module';
import { StorageServiceModule } from 'angular-webstorage-service';

import { environment } from '../environments/environment';

// Components
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ConfirmComponent } from './shared/modals/confirm/confirm.component';

// Services
import { QuizQuestionsService } from './service/quiz-questions.service';
import { AuthService } from './service/auth.service';
import { EventemitterService } from './service/eventemitter.service';
import { ConnectionService } from 'ng-connection-service';
import { ToastrModule } from 'ngx-toastr';
import { AuthGuardService } from './guards/auth-guard.service';
import { InterceptorService } from './service/interceptor.service';
import { LoaderService } from './service/loader.service';
import { TokenInterceptorService } from './service/token-interceptor.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminModule } from './admin/admin.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    DomchangedirectiveDirective,
    PageNotFoundComponent,
    ConfirmComponent,
    AppRoutingComponents
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StorageServiceModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ToastrModule.forRoot(),
    NgbModule,
    AdminModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [QuizQuestionsService,AuthService,EventemitterService,ConnectionService,AuthGuardService,LoaderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
  ],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmComponent]
})
export class AppModule { }
