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
    return this.httpClient.post(api_url + '/api/v1/questions', question);
  }

}
