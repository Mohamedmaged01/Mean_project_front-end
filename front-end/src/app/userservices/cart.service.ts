import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:3000/getusercart';
  private apiUrl1 = 'http://localhost:3000/deletefromcart';
  private api = 'http://localhost:3000/applypromocode';
  private api1 = 'http://localhost:3000/updatecartquantity';
  private api2 = 'http://localhost:3000/products/stock';
  private couponApi = 'http://localhost:3000/checkcoupon';
  private add = 'http://localhost:3000/addtocart';

  constructor(private http: HttpClient) {}

  getCartItems(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`)
  }

  removeFromCart(productId: any): Observable<any> {
    return this.http.delete(`${this.apiUrl1}/${productId}`);
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError(() => new Error(error.error?.message || 'Something went wrong with the cart operation'));
  }

  applyPromoCode(id: any, promoCode: string): Observable<any> {
    return this.http.post(`${this.api}/${id}`, { promoCode }).pipe(catchError(this.handleError));
  }

  updateCartQuantity(productId: string, quantity: number): Observable<any> {
    const body = { productid: productId, quantity }
    return this.http.put(this.api1, body);
  }

  getStock(id: any): Observable<any> {
    return this.http.get(`${this.api2}/${id}`);
  }

  checkCoupon(code: string): Observable<any> {
    return this.http.post(this.couponApi, { code });
  }

  addtocart(productId: any): Observable<any> {
    return this.http.post(this.add, { productid: productId });
  }
}