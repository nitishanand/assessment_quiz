import { Component, OnInit } from '@angular/core';

import { UsersService } from 'src/app/service/users.service';
import { User } from 'src/app/interfaces/user';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-viewusers',
  templateUrl: './viewusers.component.html',
  styleUrls: ['./viewusers.component.css']
})
export class ViewusersComponent implements OnInit {
  usersData: User[] = [];
  dataSource;
  displayedColumns: string[] = ['name', 'email', 'role', 'score'];

  // store reference to the subscription
  usersSub: Subscription;
  // error: any;

  // flag to trigger a service error if any and display a error message accordingly.
  serviceError = false;
  serviceErrorMessage;

  constructor(
    private usersService : UsersService,
    public authService: AuthService
  ) { }

  ngOnInit() {
    /* this.usersSub = this.usersService
      .getUsers()
      .subscribe(
        users => this.usersData = users,
        err => this.error = err
      ); */

    this.usersService.getUsers().subscribe(
      (data) => {
        this.usersData = data;
        // console.log(this.usersData);
      },
      (err) => {
        this.serviceError = true;
        this.serviceErrorMessage = 'There was a problem in retrieving data from the database. Try again later.';
        // console.log(this.serviceErrorMessage)
      }
    );
  }

  ngOnDestroy() {
    this.usersSub.unsubscribe();
  }

}
