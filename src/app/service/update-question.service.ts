import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const api_url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UpdateQuestionService {

  constructor(private httpClient: HttpClient) { }

  updateQuestion(questionData) {
    return this.httpClient.put(api_url + '/api/v1/questions', questionData).subscribe();
  }
}
