import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {usermodel} from '../../../interfaces/user_model'
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SignupService {
 url :string=  'http://localhost:3000/signup';
 private googleAuthUrl: string = 'http://localhost:3000/auth/google';
  constructor (private http: HttpClient) { }

  createUser(data: usermodel): Observable<any> {
    return this.http.post(this.url, data).pipe(
      catchError(this.handleError)
    );
  }
  
  googleLogin(): void {
    window.location.href = this.googleAuthUrl; 
  }
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      
    }
    return throwError(() => new Error(errorMessage));
  }
}










