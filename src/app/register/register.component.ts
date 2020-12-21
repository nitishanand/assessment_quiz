import { Component, OnInit, Inject, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { RolesService } from '../service/roles.service';
import { QuizQuestionsService } from '../service/quiz-questions.service';
import { ConnectionService } from 'ng-connection-service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements AfterViewInit {
  userDetails: string[] = [];
  roles: any[] = [];
  quizQuestions: any[];

  // sub: Subscription;
  userSelectedRole = '';

  // flag to trigger a service error if any and display a error message accordingly.
  serviceError = false;
  serviceErrorMessage;

  // checking active internet connection
  internetConnectivity = true; //initializing as online by default
  isConnected = true;

  // answers;

  registerForm;

  // @ViewChild is useful in accessing elements from the view template
  @ViewChild('nameRef', {static: false}) nameElementRef: ElementRef;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private rolesService: RolesService,
    private quizQuestionsService: QuizQuestionsService,
    private connectionService: ConnectionService,
    @Inject(SESSION_STORAGE) private storage: WebStorageService
  ) { }

  // after the view is intialized, set the focus within first textbox
  ngAfterViewInit() {
    this.nameElementRef.nativeElement.focus();
  }
  
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

    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required]
    });

    if (!this.roles) {
      this.rolesService.getRoles().subscribe({
        next: (roles) => {
          this.roles = roles;
          console.log(this.roles);
          this.saveInSession('userRoles', this.roles);
        },
        error: (err) => {
          this.serviceError = true;
          this.serviceErrorMessage = 'There is a problem fetching roles from the database. Kindly try again later.';
        }
      });
    }
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }

  onRoleSelectionChange(el) {
    this.userSelectedRole = el.target.options[el.target.options.selectedIndex].text;
  }

  onSubmitForm(form) {
    // if the form is valid, update the userDetails array
    if (this.userDetails) {
      this.userDetails.push(form.name);
      this.userDetails.push(form.email);
      this.userDetails.push(this.userSelectedRole);
      this.userDetails.push(form.role);

      // a better way of implementation - try to replace above implementation with this one.
      // this.userDetails.push(
      //   {'name': form.controls.name.value},
      //   {'email': form.controls.email.value},
      //   {'role': this.userSelectedRole},
      //   {'shortrole': form.controls.role.value}
      // );
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
    this.quizQuestionsService.getQuestions(this.userDetails[3], '2').subscribe({
      next: (data) => {
        this.quizQuestions = data;
        this.saveInSession('userDetails', this.userDetails);
        this.saveInSession('quizQuestions', this.quizQuestions);
        this.router.navigate(['/begin']);
      },
      error: (err) => {
        this.serviceError = true;
        this.serviceErrorMessage = 'There is a problem fetching questions from the database. Kindly try again later.';
      }
    });
  }

  saveInSession(key, val) {
    this.storage.set(key, val);
    this.userDetails[key] = this.storage.get(key);
  }

  getFromSession(key: string) {
    if (sessionStorage) {
      if (sessionStorage.getItem(key)) {
        return JSON.parse(sessionStorage.getItem(key));
      }
    }
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.registerForm.controls[controlName].hasError(errorName);
  }
}
