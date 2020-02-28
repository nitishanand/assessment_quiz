import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { RolesService } from '../service/roles.service';
import { QuizQuestionsService } from '../service/quiz-questions.service';
import { ConnectionService } from 'ng-connection-service';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userDetails: string[] = [];

  sub: Subscription;

  roles: any[] = [];

  userSelectedRole = '';

  quizQuestions: any[];

  // userRoles: any[] = [];

  // flag to trigger a service error if any and display a error message accordingly.
  serviceError = false;
  serviceErrorMessage;

  /* userExperience;

  experience = ['<2', '2+', '5+', '10+']; */

  // checking active internet connection
  internetConnectivity = true; //initializing as online by default
  isConnected = true;

  answers;

  constructor(
    // private eventEmitterService: EventemitterService,
    private router: Router,
    private rolesService: RolesService,
    private quizQuestionsService: QuizQuestionsService,
    private connectionService: ConnectionService,
    private notifyService: NotificationService,
    @Inject(SESSION_STORAGE) private storage: WebStorageService
  ) { }

  ngOnInit() {
    this.roles = this.getFromSession('userRoles');

    // check for active internet connection
    this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;

      if (this.isConnected) {
        this.internetConnectivity = true;
      } else {
        this.internetConnectivity = false;
      }
    });

    if (!this.roles) {
      this.rolesService.getRoles().subscribe(
        (roles) => {
          this.roles = roles;
          this.saveInSession('userRoles', this.roles);
        },
        (err) => {
          this.serviceError = true;
          this.serviceErrorMessage = 'There is a problem fetching roles from the database. Kindly try again later.';
        }
      );
    }
  }

  onRoleSelectionChange(el) {
    this.userSelectedRole = el.target.options[el.target.options.selectedIndex].text;
    // console.log(this.userSelectedRole);
  }

  onSubmitForm(form) {
    // if the form is valid, update the userDetails array
    if (this.userDetails) {
      this.userDetails.push(form.controls.name.value);
      this.userDetails.push(form.controls.email.value);
      // this.userDetails.push(form.controls.experience.value);
      this.userDetails.push(this.userSelectedRole);
      this.userDetails.push(form.controls.role.value);
    }

    // remove user details stored within session storage
    if (sessionStorage.getItem('userDetails')) {
      sessionStorage.removeItem('userDetails');
    }

    // remove questions stored within session storage
    if (sessionStorage.getItem('quizQuestions')) {
      sessionStorage.removeItem('quizQuestions');
    }

    // fetch new set of questions from the database
    this.quizQuestionsService.getQuestions(this.userDetails[3]).subscribe(
      (data) => {
        this.quizQuestions = data;
        this.saveInSession('userDetails', this.userDetails);
        this.saveInSession('quizQuestions', this.quizQuestions);
        this.router.navigate(['/begin']);
      },
      (err) => {
        this.serviceError = true;
        this.serviceErrorMessage = 'There is a problem fetching questions from the database. Kindly try again later.';
      }
    );
    

    // console.log(this.serviceErrorMessage);
    // this.saveInSession('userDetails', this.userDetails);
    // this.router.navigate(['/begin']);

    // this.showToaster();
  }

  log(form) {
    // console.log(form);
  }

  saveInSession(key, val) {
    // console.log('received=key' + key + ', value: ' + val);
    this.storage.set(key, val);
    this.userDetails[key] = this.storage.get(key);
  }

  getFromSession(whatToSearch: string) {
    if (sessionStorage) {
      if (sessionStorage.getItem(whatToSearch)) {
        return JSON.parse(sessionStorage.getItem(whatToSearch));
      } /* else {
        console.log('does not exist');
      } */
    }
  }

  /* showToaster(){
    // this.toastr.success("Hello, I'm the toastr message.")
    this.notifyService.showSuccess('Data shown successfully!', 'Notification');
  } */

}
