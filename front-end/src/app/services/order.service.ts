import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {}
  private API_URL = 'http://localhost:3000/getorders';
  getOrders(): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error("No token found! User may need to log in.");
      return throwError(() => new Error("No token available. Please log in."));
    }
    
    return this.http.get<any>(this.API_URL);
  }
}
