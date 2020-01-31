import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

const api_url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  /* roles = [
    {value: 'userinterfacedesign', viewValue: 'User Interface Designer'},
    {value: 'frontend', viewValue: 'Frontend Developer'},
    {value: 'backend', viewValue: 'Software Developer'}
  ]; */

  constructor(private httpClient: HttpClient) { }

  getRoles() {
    return this.httpClient.get<any[]>(api_url + '/api/roles');
  }
}
