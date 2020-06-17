import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Role } from '../interfaces/role';

const api_url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  public serviceError;
  public serviceErrorMessage;

  constructor(private httpClient: HttpClient) { }

  addRole(role: Role) {
    return this.httpClient.post(api_url + '/api/v1/roles', role);
  }

  getRoles() {
    /* return this.httpClient.get<any[]>(api_url + '/api/v1/roles').pipe(
      catchError(this.handleError)
    ); */
    return this.httpClient.get<any[]>(api_url + '/api/v1/roles');
  }

  /* updateRole(id) {
    // let params = new HttpParams().set('id', queryParams);

    return this.httpClient.put(api_url + '/api/v1/roles/' + id);
  } */

  updateRole(roleId: string, roleData: Role) {
    return this.httpClient.put<Role>(api_url + '/api/v1/roles' + '/' + roleId, roleData);
  }

  deleteRole(roleId: string) {
    return this.httpClient.delete(api_url + '/api/v1/roles' + '/' + roleId);
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = '';

    if (errorResponse instanceof ErrorEvent) {
      errorMessage = `Error ${ errorResponse.message }`;
    } else {
      errorMessage = `Error: ${ errorResponse.status }, Message: ${ errorResponse.message }`

      this.serviceErrorMessage = errorMessage;
    }

    return throwError('There is a problem with the service. We are notified and working on it. Please try again later.');
  }
}
