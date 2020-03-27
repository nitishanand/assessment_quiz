import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// import * as auth0 from 'auth0-js';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

import { UserDetails } from '../interfaces/userdetails';
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
  /* // Create Auth0 web auth instance
  auth0 = new auth0.WebAuth({
    clientID: environment.auth.clientID,
    domain: environment.auth.domain,
    responseType: 'token',
    redirectUri: environment.auth.redirect,
    audience: environment.auth.audience,
    scope: environment.auth.scope
  });
  // Store authentication data
  expiresAt: number;
  userProfile: any;
  accessToken: string;
  authenticated: boolean; */

  private token: string;

  constructor(private http: HttpClient, private router: Router) {
    // this.getAccessToken();
  }

  private saveToken(token: string) {
    localStorage.setItem('mean-token', token);
    this.token = token;
  }

  private getToken() {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }

    return this.token;
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;

    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);

      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn() {
    const user = this.getUserDetails();

    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
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
        }
        return data;
      })
    );
  
    return request;
  }

  public register(user: TokenPayload): Observable<any> {
    return this.request('post', 'register', user);
    // return this.httpClient.post(api_url + '/api/adduserscore', user);
  }

  public login(user: TokenPayload): Observable<any> {
    return this.request('post', 'login', user);
  }

  public profile(): Observable<any> {
    return this.request('get', 'profile');
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('mean-token');
    this.router.navigateByUrl('/');
  }

  /* login(credentials) {
    this.auth0.authorize();
  }

  handleLoginCallback() {
    // When Auth0 hash parsed, get profile
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken) {
        window.location.hash = '';
        this.getUserInfo(authResult);
      } else if (err) {
        console.error(`Error: ${err.error}`);
      }
      this.router.navigate(['/']);
    });
  }

  getAccessToken() {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken) {
        this.getUserInfo(authResult);
      }
    });
  }

  getUserInfo(authResult) {
    // Use access token to retrieve user's profile and set session
    this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
      if (profile) {
        this._setSession(authResult, profile);
      }
    });
  }

  private _setSession(authResult, profile) {
    // Save authentication data and update login status subject
    this.expiresAt = authResult.expiresIn * 1000 + Date.now();
    this.accessToken = authResult.accessToken;
    this.userProfile = profile;
    this.authenticated = true;
  }

  logout() {
    // Log out of Auth0 session
    // Ensure that returnTo URL is specified in Auth0
    // Application settings for Allowed Logout URLs
    this.auth0.logout({
      returnTo: 'http://localhost:4200',
      clientID: environment.auth.clientID
    });
  }

  get isLoggedIn(): boolean {
    // Check if current date is before token
    // expiration and user is signed in locally
    return Date.now() < this.expiresAt && this.authenticated;
  } */

}
