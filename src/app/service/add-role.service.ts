import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Role } from '../interfaces/role';

const api_url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AddRoleService {

  constructor(private httpClient: HttpClient) { }

  addRole(role: Role) {
    return this.httpClient.post(api_url + '/api/addrole', role);
  }
}
