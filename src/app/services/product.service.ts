import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}


  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    console.log('Token from localStorage:', token);

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    if (token) {
      headers = headers.set('token', `${token}`);
    } else {
      console.error('No Token Found in localStorage!');
    }

    return headers;
  }

  getProducts(): Observable<any[]> {
    const headers = this.getAuthHeaders();
    console.log('Request Headers:', headers.keys().map(key => ({ key, value: headers.get(key) })));

    return this.http.get<{ message: string; data: any[] }>(this.apiUrl, { headers }).pipe(
      tap(response => console.log('API Response:', response)),
      map(response => response.data),
      catchError(error => {
        console.error('API Error:', error);
        return of([]);
      })
    );
  }

  getProductById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      tap(data => console.log('API Response:', data)),
      catchError(error => {
        console.error('API Error:', error);
        return of(null);
      })
    );
  }

}
