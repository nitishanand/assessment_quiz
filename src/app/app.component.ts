import { Component } from '@angular/core';
// import { EventemitterService } from './service/eventemitter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'assessment-quiz';
  userAssessmentScore: number;
  // userDetails;

  constructor(
    // private eventEmitterService: EventemitterService
  ) {}

  ngOnInit() {
    // this.userDetails = this.eventEmitterService.
    // this.userDetails = this.eventEmitterService.data;
    // console.log(this.userDetails);
  }

  onSubmitQuiz(userScore: number) {
    this.userAssessmentScore = userScore;
  }
}
