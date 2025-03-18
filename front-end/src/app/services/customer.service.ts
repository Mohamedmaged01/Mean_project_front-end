import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  private API_URL = 'http://localhost:3000/users';
  getCustomers(): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error("No token found! User may need to log in.");
      return throwError(() => new Error("No token available. Please log in."));
    }
    
    return this.http.get<any>(this.API_URL);
  }

  private API_URL1 = 'http://localhost:3000/users';
  deleteCustomer (id: any): Observable<any> {
    return this.http.delete(`${this.API_URL1}/${id}`);
  }
}
