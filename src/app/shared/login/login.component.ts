import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginStatus;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  /* authenticateUser(username) {
    this.authService.login(username).subscribe((res) => {
      console.log('login form submitted');
    });
  } */

}
