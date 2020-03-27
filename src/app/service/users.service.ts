import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { User } from '../interfaces/user';

const api_url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  getUsers() {
    return this.httpClient.get<any>(api_url + '/api/v1/users').pipe(
      catchError(this.handleError)
    );
  }

  addUserScore(user: User) {
    return this.httpClient.post(api_url + '/api/v1/users', user);
  }

  private handleError(err: HttpErrorResponse | any) {
    console.error('An error occurred', err);
    return throwError(err.message || err);
  }
}
