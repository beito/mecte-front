import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(public authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let idToken = "";
    if (localStorage.getItem("user")) {
      idToken = JSON.parse(localStorage.getItem("user")!).token;
    }
    if (idToken) {
      const cloned = req.clone({ headers: req.headers.set("Authorization", "Bearer " + idToken) });
      return next.handle(cloned).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 403) {
            this.authService.logout();
            return throwError(() => new Error(error.message));
          } else {
            return throwError(() => error);
          }
        })
      );
    } else {
      return next.handle(req).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 403) {
            this.authService.logout();
            return throwError(() => new Error(error.message));
          } else {
            return throwError(() => error);
          }
        })
      );
    }
  }
}