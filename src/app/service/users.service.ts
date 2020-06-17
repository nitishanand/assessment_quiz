import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { User } from '../interfaces/user';

const api_url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(api_url + '/api/v1/users');
  }

  addUserScore(user: User) {
    return this.httpClient.post(api_url + '/api/v1/users', user);
  }

  private handleError(err: HttpErrorResponse | any) {
    // console.error('An error occurred', err);
    return throwError(err.message || err);
  }
}
