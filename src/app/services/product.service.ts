import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getProductById(id: string): Observable<any> {
    console.log(`Fetching product with ID: ${id}`);

    return this.http.get<any>(`${this.apiUrl}/products/${id}`)
      .pipe(
        tap(data => console.log('API Response:', data)),
        catchError(error => {
          console.error('API Error:', error);
          return of(null);
        })
      );
  }
}
