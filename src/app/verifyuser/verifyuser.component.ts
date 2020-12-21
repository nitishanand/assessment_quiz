import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verifyuser',
  templateUrl: './verifyuser.component.html',
  styleUrls: ['./verifyuser.component.css']
})
export class VerifyuserComponent implements OnInit {
  tokenVerifyForm;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.tokenVerifyForm = this.fb.group({
      token: ['', Validators.required]
    })
  }

  // verify email of user via a secret token
  verifyEmail(value) {
    let secretToken = value.token;
    // console.log(secretToken);

    this.authService.verify(secretToken).subscribe({
      next: (data) => {this.router.navigateByUrl('/login')},
      error: () => {},
      complete: () => {}
    });
  }

}
