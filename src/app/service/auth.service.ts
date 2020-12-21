import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

import { TokenResponse } from '../interfaces/tokenresponse';
import { TokenPayload } from '../interfaces/tokenpayload';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

(window as any).global = window;

const api_url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    })
  }

  constructor(private http: HttpClient, private router: Router) { }

  private saveToken(token: string) {
    const now = Math.round(new Date().getTime() / 1000);
    const item = {
      value: token,
      expiry: (now + 3600)
    };

    if (!localStorage.getItem('mean-token')) {
      localStorage.setItem('mean-token', JSON.stringify(item));
      this.token = token;
    }
  }

  public getToken() {
    const token = localStorage.getItem('mean-token');
    const tokenString = JSON.parse(token);
    const now = Math.round(new Date().getTime() / 1000);

    if (!token) {
      return null;
    }

    // check if the token exists and token expiry
    // if the token is expired, remove the token from local storage
    if (token && (now >= tokenString.expiry)) {
      localStorage.removeItem('mean-token');
      this.router.navigateByUrl('/');
    }

    // if the token is valid, return the token
    return token;
  }

  public isLoggedIn() {
    const token = localStorage.getItem('mean-token');

    if (token) {
      return true;
    }

    return false;
  }

  private request(method: 'post'|'get', type: 'login'|'register'|'profile', user?: TokenPayload): Observable<any> {
    let base;

    if (method === 'post') {
      base = this.http.post((api_url + `/api/v1/${type}`), user);
    } else {
      base = this.http.get((api_url + `/api/v1/${type}`), { headers: { Authorization: `Bearer ${this.getToken()}` }});
    }

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
          this.router.navigateByUrl('/admin/login');
        }
        return data;
      })
    );

    return request;
  }

  /* public register(user: TokenPayload): Observable<any> {
    return this.request('post', 'register', user);
    // return this.httpClient.post(api_url + '/api/adduserscore', user);
  } */

  public login(user: TokenPayload): Observable<any> {
    // console.log(user);
    // console.log(this.httpOptions);
    return this.request('post', 'login', user);
    // return this.http.post(api_url + '/api/v1/login', user);
  }

  public profile(): Observable<any> {
    return this.request('get', 'profile');
  }

  /* public profile(token) {
    let params = new HttpParams().set('token', token);

    return this.http.get(api_url + '/api/v1/profile', {params: params});
  } */

  public register(user: TokenPayload) {
    return this.http.post(api_url + '/api/v1/login', user);
  }

  public verify(token: string) {
    let params = new HttpParams().set('token', token);

    return this.http.get(api_url + '/api/v1/verify', {params: params});
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('mean-token');
    this.router.navigateByUrl('/admin/login');
  }

}
