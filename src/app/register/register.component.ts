import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
// import { EventemitterService } from '../service/eventemitter.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // @Output() userName = new EventEmitter<string[]>();

  userDetails: string[] = [];

  sub: Subscription;

  userExperience;

  experience = ['<2', '2+', '5+', '10+'];

  constructor(
    // private eventEmitterService: EventemitterService,
    private router: Router,
    @Inject(SESSION_STORAGE) private storage: WebStorageService
  ) { }

  ngOnInit() {
  }

  onSubmitForm(form) {
    /* console.log(form.controls.name.value);
    console.log(form.controls.email.value); */
    // console.log(form.controls);

    if (this.userDetails) {
      this.userDetails.push(form.controls.name.value);
      this.userDetails.push(form.controls.email.value);
      this.userDetails.push(form.controls.experience.value);
    }

    // console.log(this.userDetails);
    // this.userName.emit(this.userDetails);
    // this.eventEmitterService.sendMessage(this.userDetails);
    // this.eventEmitterService.data = this.userDetails;
    this.saveInSession('userDetails', this.userDetails);
    this.router.navigate(['/begin']);
    // this.sub = this.router.
  }

  log(form) {
    // console.log(form);
  }

  saveInSession(key, val) {
    console.log('received=key' + key + ', value: ' + val);
    this.storage.set(key, val);
    this.userDetails[key] = this.storage.get(key);
  }

}
