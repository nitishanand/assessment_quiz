import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { TokenPayload } from '../interfaces/tokenpayload';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {
  /* ngAfterViewInit(): void {
    throw new Error("Method not implemented.");
  } */
  serviceError = false;
  serviceErrorMessage: string;
  
  credentials: TokenPayload = {
    email: '',
    password: ''
  };

  // @ViewChild is useful in accessing elements from the view template
  @ViewChild('nameRef', {static: false}) nameElementRef: ElementRef;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  // after the view is intialized, set the focus within first textbox
  ngAfterViewInit() {
    this.nameElementRef.nativeElement.focus();
    console.log(this.nameElementRef.nativeElement.parentElement);
  }

  login() {
    this.auth.login(this.credentials).subscribe(
      () => {
        this.router.navigateByUrl('/profile');
      },
      (err) => {
        // this.serviceError = true;
        // this.serviceErrorMessage = 'There is a problem validating your credentials with the database. Kindly try again later.';
      }
    )
  }
}
