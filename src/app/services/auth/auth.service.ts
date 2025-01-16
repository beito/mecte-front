import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

import jwt_decode from 'jwt-decode';

import { environment } from 'src/environments/environment';
import { User, Token } from 'src/app/interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<User | null>;
  private authRoutes: string = `${environment.apiUrl}auth/`;

  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
  }

  public get userValue() {
    return this.userSubject.value;
  }

  register(register: Object) {
    return this.http.post(`${this.authRoutes}insertUser`, register).pipe(
      map((response) => {
        return response;
      }));
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${this.authRoutes}login`, { email, password }).pipe(
      map((user) => {
        const { data } = user;
        localStorage.setItem('user', JSON.stringify(data));
        this.userSubject.next(user);
        return user;
      })
    );
  }

  requestRecoveryCode(email: string): Observable<any> {
    return this.http.put(`${this.authRoutes}recoveryCode`, { email }).pipe(
      map((response) => {
        return response;
      }));
	}

	getUserInfo(id: number): Observable<any> {
    return this.http.get(`${this.authRoutes}getUserInfo?id=${id}`)
      .pipe(retry(1), catchError(this.handleError));
	}

  getUsers(): Observable<any> {
    return this.http
      .get<any>(`${this.authRoutes}getUsers`)
      .pipe(retry(1), catchError(this.handleError));
  }

  validateRecoveryCode(email: string, code: string): Observable<any> {
    return this.http.get(`${this.authRoutes}validateCode?user_email=${email}&restoreCode=${code}`)
      .pipe(retry(1), catchError(this.handleError));
	}

	requestPasswordChange(payload: any): Observable<any> {
    return this.http.put(`${this.authRoutes}changePassword`, { ...payload }).pipe(
      map((response) => {
        return response;
      }));
	}

	requestPasswordChangeFirstLogin(payload: any): Observable<any> {
    return this.http.put(`${this.authRoutes}changePasswordFirstLogin`, { ...payload }).pipe(
      map((response) => {
        return response;
      }));
	}

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/auth/signin']);
  }

  getSession() {
    const storedUser: string | null = localStorage.getItem('user');
    if (storedUser) {
      const session = JSON.parse(storedUser).token;  
      if (session) {
        return {
          valid: true,
          session
        };
      }
    }
    return {
      valid: false
    };
  }

  getRole() {//?
    let userToken: Token = jwt_decode(JSON.parse(localStorage.getItem('user')!).token);
    let role = userToken.role;
    return role;
  }
  
  getUserName() {
    let userToken: Token = jwt_decode(JSON.parse(localStorage.getItem('user')!).token);
    let role = userToken.name;
    return role;
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}