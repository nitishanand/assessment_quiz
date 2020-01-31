import { Component, OnInit } from '@angular/core';

import { UsersService } from 'src/app/service/users.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-viewusers',
  templateUrl: './viewusers.component.html',
  styleUrls: ['./viewusers.component.css']
})
export class ViewusersComponent implements OnInit {
  usersData: User[] = [];
  dataSource;
  displayedColumns: string[] = ['name', 'email', 'role', 'score'];

  constructor(private usersService : UsersService) { }

  ngOnInit() {
    this.usersService.getUsers().subscribe(data => {
      this.usersData = data;
      // this.dataSource = this.usersData;
    });
  }

}
