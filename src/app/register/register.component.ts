import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { RolesService } from '../service/roles.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userDetails: string[] = [];

  sub: Subscription;

  roles: any[] = [];

  /* userExperience;

  experience = ['<2', '2+', '5+', '10+']; */

  constructor(
    // private eventEmitterService: EventemitterService,
    private router: Router,
    private rolesService: RolesService,
    @Inject(SESSION_STORAGE) private storage: WebStorageService
  ) { }

  ngOnInit() {
    this.rolesService.getRoles().subscribe((roles) => {
      this.roles = roles;
    });
  }

  onSubmitForm(form) {
    if (this.userDetails) {
      this.userDetails.push(form.controls.name.value);
      this.userDetails.push(form.controls.email.value);
      // this.userDetails.push(form.controls.experience.value);
      this.userDetails.push(form.controls.role.value);
    }

    this.saveInSession('userDetails', this.userDetails);
    this.router.navigate(['/begin']);
  }

  log(form) {
    // console.log(form);
  }

  saveInSession(key, val) {
    // console.log('received=key' + key + ', value: ' + val);
    this.storage.set(key, val);
    this.userDetails[key] = this.storage.get(key);
  }

}
