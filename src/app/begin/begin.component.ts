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
  serviceError = false;
  serviceErrorMessage;

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
    // console.log(this.userInfo);
    // console.log(this.totalQuestions);

    // check for active internet connection
    /* this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;

      if (this.isConnected) {
        this.internetConnectivity = true;
      } else {
        this.internetConnectivity = false;
      }
    }); */
  }

  beginQuiz() {
    /* this.quizQuestionsService.getQuestions().subscribe((data) => {
      this.quizQuestions = data;
      this.saveInSession('quizQuestions', this.quizQuestions);
      this.router.navigate(['/quiz']);
    }); */

    /* this.quizQuestionsService.getQuestions(this.userInfo[3]).subscribe(
      (data) => {
        this.quizQuestions = data;
        this.saveInSession('quizQuestions', this.quizQuestions);
        this.router.navigate(['/quiz']);
      },
      (err) => {
        this.serviceError = true;
        this.serviceErrorMessage = err;
      }
    ); */

    this.router.navigate(['/quiz']);
  }

  saveInSession(key, val) {
    console.log('received=key' + key + ', value: ' + val);
    this.storage.set(key, val);
    this.quizQuestions[key] = this.storage.get(key);
  }

  getFromSession(whatToSearch: string) {
    if (sessionStorage) {
      if (sessionStorage.getItem(whatToSearch)) {
        return JSON.parse(sessionStorage.getItem(whatToSearch));
      } else {
        console.log('does not exist');
      }
    }
  }

}
