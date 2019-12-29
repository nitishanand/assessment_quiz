import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { Question } from '../interfaces/question';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const api_url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class QuizQuestionsService {
  constructor(private httpClient: HttpClient) { }

  getQuestions() {
    return this.httpClient.get<Question[]>(api_url + '/api/questions').pipe(catchError(this.handleError));
  }

  // handling errors
  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client side error: ' + errorResponse.error.message);
    } else {
      console.error('Server side error: ' + errorResponse);
    }

    return throwError('There is a problem with the service. We are notified and working on it. Please try again later.');
  }
}
