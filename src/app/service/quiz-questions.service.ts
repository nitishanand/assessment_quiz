import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { of } from 'rxjs';
import { Question } from '../interfaces/question';
import { User } from '../interfaces/user';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const api_url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class QuizQuestionsService {
  public serviceError;
  public serviceErrorMessage;

  constructor(private httpClient: HttpClient) { }

  getQuestions(searchQuery) {
    let params = new HttpParams().set('role', searchQuery);

    return this.httpClient.get<Question[]>(api_url + '/api/questions', {params: params}).pipe(catchError(this.handleError));
  }

  getAnswers() {
    return this.httpClient.get<Question[]>(api_url + '/api/answers').pipe(catchError(this.handleError));
  }

  addUserScore(user: User) {
    return this.httpClient.post(api_url + '/api/adduserscore', user);
  }

  // handling errors
  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = '';
    // console.log(errorResponse.error);

    if (errorResponse instanceof ErrorEvent) {
      // console.error('Client side error: ' + errorResponse.error.message);
      errorMessage = `Error ${ errorResponse.message }`;
    } else {
      // console.log('Server side error: ' + errorResponse.message);
      errorMessage = `Error: ${ errorResponse.status }, Message: ${ errorResponse.message}`
      this.serviceErrorMessage = errorMessage;
    }

    /* for (const property in errorResponse) {
      console.log(property);
    } */

    return throwError('There is a problem with the service. We are notified and working on it. Please try again later.');

    return throwError(errorMessage);
  }
}
