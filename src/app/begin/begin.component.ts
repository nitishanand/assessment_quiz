import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { QuizQuestionsService } from '../service/quiz-questions.service';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-begin',
  templateUrl: './begin.component.html',
  styleUrls: ['./begin.component.css']
})
export class BeginComponent implements OnInit {
  quizQuestions: any[];
  serviceError = false;
  serviceErrorMessage;

  constructor(
    private quizQuestionsService: QuizQuestionsService,
    private router: Router,
    @Inject(SESSION_STORAGE) private storage: WebStorageService
  ) { }

  ngOnInit() {
  }

  beginQuiz() {
    /* this.quizQuestionsService.getQuestions().subscribe((data) => {
      this.quizQuestions = data;
      this.saveInSession('quizQuestions', this.quizQuestions);
      this.router.navigate(['/quiz']);
    }); */

    this.quizQuestionsService.getQuestions().subscribe(
      (data) => {
        this.quizQuestions = data;
        this.saveInSession('quizQuestions', this.quizQuestions);
        this.router.navigate(['/quiz']);
      },
      (err) => {
        this.serviceError = true;
        this.serviceErrorMessage = err;
      }
    );
  }

  saveInSession(key, val) {
    console.log('received=key' + key + ', value: ' + val);
    this.storage.set(key, val);
    this.quizQuestions[key] = this.storage.get(key);
  }

}
