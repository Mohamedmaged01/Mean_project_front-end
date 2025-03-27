// userinfo.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserinfoService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }
    return new HttpHeaders({
      'token': token
    });
  }

  getAllUsers(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.apiUrl}/users`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  getUserOrders(userId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.apiUrl}/getuserorder/${userId}`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  updateUser(userId: string, userData: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put<any>(`${this.apiUrl}/users/${userId}`, userData, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }


  updateUserStatus(userId: string, status: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put<any>(`${this.apiUrl}/users/${userId}`, { status }, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    let errorMessage = 'Something went wrong with the operation';
    
    if (error.status === 401) {
      errorMessage = 'Unauthorized: Invalid or missing token';
    } else if (error.status === 404) {
      errorMessage = 'Resource not found';
    } else if (error.status === 500) {
      errorMessage = 'Server error, please try again later';
    }

    return throwError(() => new Error(errorMessage));
  }
}