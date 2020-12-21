import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { finalize, tap, catchError, retry } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { LoaderService } from './loader.service';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  constructor(
    public loaderService: LoaderService,
    public toastrService: ToastrService,
    private router: Router,
    private auth: AuthService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.show();

    const isAdminLoggedIn = this.auth.isLoggedIn();

    // console.log(isAdminLoggedIn);

    if (!isAdminLoggedIn) {
      this.router.navigateByUrl('/admin/login');
    }

    return next.handle(req)
    .pipe(
      tap(evt => {
        if (evt instanceof HttpResponse) {
          if (evt.body && evt.body.success) {
            this.toastrService.success(evt.body.message, evt.body.title, {
              positionClass: 'toast-bottom-center',
              timeOut: 10000,
              easing: 'ease-out'
            });
          }
        }
      }),
      // retry(1),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';

        if (error.status === 401) {
          // console.log(error.message);
          this.auth.logout();
          this.router.navigateByUrl('/admin/login');
        }

        if (error.error instanceof ErrorEvent) {
          errorMessage = `Error: ${error.error.message}`;
        } else {
          errorMessage = `Error Code: ${error.status} \nMessage: ${error.message}`;
        }

        // console.log(errorMessage);
        return throwError(errorMessage);
      }),
      finalize(() => {
        this.loaderService.hide();
      })
    );
  }
}
