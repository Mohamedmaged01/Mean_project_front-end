import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    console.log('📡 Fetching products from:', `${this.baseUrl}/products`);
    return this.http.get<any>(`${this.baseUrl}/products`);
  }

  addProduct(product: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/createproduct`, product);
  }

  deleteProduct(productId: number): Observable<any> {
    console.log('🗑 Deleting product ID:', productId);
    return this.http.delete<any>(`${this.baseUrl}/products/${productId}`);
  }

  getProductById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/products/${id}`);
  }

  updateProduct(id: string, product: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/products/${id}`, product);
  }
}
