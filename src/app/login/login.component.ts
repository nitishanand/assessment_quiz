import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { TokenPayload } from '../interfaces/tokenpayload';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  serviceError = false;
  serviceErrorMessage: string;
  
  credentials: TokenPayload = {
    email: '',
    password: ''
  };

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.auth.login(this.credentials).subscribe(
      () => {
        this.router.navigateByUrl('/profile');
      },
      (err) => {
        this.serviceError = true;
        this.serviceErrorMessage = 'There is a problem validating your credentials with the database. Kindly try again later.';
      }
    )
  }

  

}
