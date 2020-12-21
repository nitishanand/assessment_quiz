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
    this.auth.register(this.credentials).subscribe({
      next: (token) => {
        if (token) {
          this.router.navigateByUrl('/admin/login');
        }
      },
      error: (err) => {
        this.serviceError = true;
        this.serviceErrorMessage = err;
      }
    })
  }

}
