import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) {}
  private API_URL3 = 'http://localhost:3000/makeorder';
  placeOrder(orderData: any): Observable<any> {
    return this.http.post(`${this.API_URL3}`, orderData,);
  }
}
