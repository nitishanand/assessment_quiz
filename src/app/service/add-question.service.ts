import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Subject } from 'rxjs';

import { Question } from '../interfaces/question';

const api_url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AddQuestionService {
  private question: Question[] = [];
  private questionUpdated = new Subject<Question[]>();

  constructor(private httpClient: HttpClient) { }

  addQuestion(question: Question) {
    /* const question: Question = {
      title: title,
      options: options,
      answer: answer,
      min_exp: min_exp,
      max_exp: max_exp,
      question_type: question_type
    }; */

    /* this.httpClient.post<Question[]>(api_url + '/api/addquestion', question).subscribe((responseData) => {
      console.log(responseData);
      this.question.push(question);
      this.questionUpdated.next([...this.question]);
    }); */

    return this.httpClient.post(api_url + '/api/addquestion', question);
  }
}
