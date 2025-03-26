
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:3000/getusercart';

  constructor(private http: HttpClient) {}
  getCartItems(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`)
  }

  removeFromCart(productId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deletefromcart/${productId}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError(() => new Error(error.error?.message || 'Something went wrong with the cart operation'));
  }

  private api= 'http://localhost:3000/applypromocode';
  applyPromoCode(id : any, promoCode: string): Observable<any> {
    return this.http.post(`${this.api}/${id}`, { promoCode }).pipe( catchError(this.handleError));
  }
}
