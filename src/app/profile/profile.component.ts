import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { UserDetails } from '../interfaces/userdetails';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  details: UserDetails;
  serviceError = false;
  serviceErrorMessage: string;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.profile().subscribe(user => {
      // console.log(user);
      this.details = user;
    }, (err) => {
      this.serviceError = true;
      this.serviceErrorMessage = err;
      // console.error(err);
    });
  }

}
