import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface LoginData {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url: string = 'http://localhost:3000/login'; 

  constructor(private http: HttpClient) {}

  login(data: LoginData): Observable<any> {
    return this.http.post(this.url, data).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = 'A client-side error occurred';
    } else {
      errorMessage = error.error.message || 'Login failed. Please try again.';
    }
    return throwError(() => new Error(errorMessage));
  }
}