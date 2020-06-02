import { Component, OnInit } from '@angular/core';
import { TokenPayload } from '../interfaces/tokenpayload';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit {
  credentials: TokenPayload = {
    email: '',
    name: '',
    password: ''
  };

  // flag to trigger a service error if any and display a error message accordingly.
  serviceError = false;
  serviceErrorMessage;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  createUser() {
    /* this.auth.register(this.credentials).subscribe((user) => {
      if (user) {
        this.router.navigateByUrl('/profile');
      }
    }, (err) => {
      console.error(err);
    }); */

    this.auth.register(this.credentials).subscribe({
      next: (token) => {
        if (token) {
          console.log(token);
          this.router.navigateByUrl('/login');
        }
      },
      error: (err) => {
        console.log(err);
        this.serviceError = true;
        this.serviceErrorMessage = err;
      }
    })
  }

}
