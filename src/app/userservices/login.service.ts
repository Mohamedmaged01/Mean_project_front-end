import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface LoginData {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url: string = 'http://localhost:3000/login'; 
  private googleAuthUrl: string = 'http://localhost:3000/auth/google';

  constructor(private http: HttpClient) {}

  login(data: LoginData): Observable<any> {
    return this.http.post<{ token: string }>(this.url, data).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
      }),
      catchError(this.handleError)
    );
  }

  googleLogin(): void {
    window.location.href = this.googleAuthUrl;
  }

  getToken(): string | null {
    return localStorage.getItem('token'); 
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: invalid password or email`;
    } else {
      errorMessage = `Error: invalid password or email`;
    }
    return throwError(() => new Error(errorMessage));
  }

  getLoggedInUser() {
    return JSON.parse(localStorage.getItem('token') || 'null');
  }
}
