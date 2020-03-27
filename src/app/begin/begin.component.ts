import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';

// import { QuizQuestionsService } from '../service/quiz-questions.service';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { ConnectionService } from 'ng-connection-service';

@Component({
  selector: 'app-begin',
  templateUrl: './begin.component.html',
  styleUrls: ['./begin.component.css']
})
export class BeginComponent implements OnInit {
  quizQuestions: any[];
  totalQuestions: number;

  // flag to trigger a service error if any and display a error message accordingly.
  // serviceError = false;
  // serviceErrorMessage;

  userInfo: any[] = [];

  // checking active internet connection
  /* internetConnectivity = true; //initializing as online by default
  isConnected = true; */

  constructor(
    // private quizQuestionsService: QuizQuestionsService,
    private router: Router,
    private connectionService: ConnectionService,
    @Inject(SESSION_STORAGE) private storage: WebStorageService
  ) { }

  ngOnInit() {
    this.userInfo = this.getFromSession('userDetails');
    this.totalQuestions = this.getFromSession('quizQuestions').length;
  }

  beginQuiz() {
    this.router.navigate(['/quiz']);
  }

  getFromSession(key: string) {
    if (sessionStorage) {
      if (sessionStorage.getItem(key)) {
        return JSON.parse(sessionStorage.getItem(key));
      } else {
        console.log('does not exist');
      }
    }
  }

}
