import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
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

  getQuestions(searchQuery: string, limit?: string) {
    if (searchQuery) {
      let params = new HttpParams().set('role', searchQuery).append('limit', limit);

      return this.httpClient.get<Question[]>(api_url + '/api/v1/questions', {params: params}).pipe(catchError(this.handleError));
    } else {
      return this.httpClient.get<Question[]>(api_url + '/api/v1/questions').pipe(catchError(this.handleError));
    }
  }

  getQuestion() {}

  createQuestion(question: Question) {
    return this.httpClient.post(api_url + '/api/v1/questions', question);
  }

  getAnswers(searchQuery: string) {
    // return this.httpClient.get<Question[]>(api_url + '/api/v1/answers').pipe(catchError(this.handleError));
    if (searchQuery) {
      let params = new HttpParams().set('role', searchQuery);

      return this.httpClient.get<Question[]>(api_url + '/api/v1/answers', {params: params}).pipe(catchError(this.handleError));
    } else {
      return this.httpClient.get<Question[]>(api_url + '/api/v1/answers').pipe(catchError(this.handleError));
    }
  }

  addUserScore(user: User) {
    return this.httpClient.post(api_url + '/api/v1/users', user);
  }

  updateQuestion(questionId: string, questionData: Question) {
    return this.httpClient.put<Question>(api_url + '/api/v1/questions' + '/' + questionId, questionData);
  }

  updateQuestionRole(shortrole: string, updatedRole: string) {
    return this.httpClient.put(api_url + '/api/v1/questions', {'shortrole': shortrole, 'updatedrole': updatedRole});
  }

  deleteQuestion(questionId: string) {
    return this.httpClient.delete(api_url + '/api/v1/questions' + '/' + questionId);
  }

  // handling errors
  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = '';
    // console.log(errorResponse.error);

    if (errorResponse instanceof ErrorEvent) {
      errorMessage = `Error ${ errorResponse.message }`;
    } else {
      errorMessage = `Error: ${ errorResponse.status }, Message: ${ errorResponse.message }`

      this.serviceErrorMessage = errorMessage;
    }

    return throwError('There is a problem with the service. We are notified and working on it. Please try again later.');
  }
}
