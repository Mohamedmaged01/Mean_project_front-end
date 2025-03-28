import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map, tap, catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000';
  private allProducts: any[] = [];

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  loadAllProducts(): Observable<any[]> {
    return this.http
      .get<{ message: string; data: any[] }>(`${this.apiUrl}/products`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(
        map((response) => {
          this.allProducts = response.data;
          return response.data;
        }),
        catchError(() => of([]))
      );
  }

  getProducts(): Observable<any[]> {
    if (this.allProducts.length > 0) {
      return of(this.allProducts);
    }
    return this.loadAllProducts();
  }

  instantSearch(query: string): Observable<any[]> {
    if (!query.trim()) {
      return of([]);
    }

    if (/^[0-9a-fA-F]{24}$/.test(query)) {
      return this.searchById(query).pipe(
        map(product => product ? [product] : [])
      );
    }

    return this.searchProducts(query).pipe(
      map(response => response.data)
    );
  }

  getFiltterProducts(filters: any = {}): Observable<any[]> {
    let params: any = {};

    if (filters.search) params.search = filters.search;
    if (filters.minPrice) params.minPrice = filters.minPrice;
    if (filters.maxPrice) params.maxPrice = filters.maxPrice;
    if (filters.category) params.category = filters.category;
    if (filters.sortBy) params.sortBy = filters.sortBy;
    if (filters.order) params.order = filters.order;

    return this.http
      .get<{ message: string; data: any[] }>(`${this.apiUrl}/products`, {
        headers: this.getAuthHeaders(),
        params: params,
      })
      .pipe(
        map((response) => response.data || []),
        catchError(() => of([]))
      );
  }

  getProductById(id: string): Observable<any> {
    return this.searchById(id);
  }

  getProductsByCategory(categoryId: string): Observable<any> {
    if (!categoryId) return of([]);

    return this.http
      .get<any>(`${this.apiUrl}/getproductsbycategory/${categoryId}`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(
        map((response) => response.data || response),
        catchError((error) => {
          console.error('API Error:', error);
          return of([]);
        })
      );
  }

  searchProducts(query: string): Observable<{ data: any[], isPartialMatch: boolean }> {
    const encodedQuery = encodeURIComponent(query);
    return this.http
      .get<any>(`${this.apiUrl}/search?q=${encodedQuery}`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(
        map((response) => {
          if (!response.data || response.data.length === 0) {
            return { data: this.localSearch(query), isPartialMatch: true };
          }
          return { data: response.data, isPartialMatch: false };
        }),
        catchError((error) => {
          console.error('Search API error:', error);
          return of({ data: this.localSearch(query), isPartialMatch: true });
        })
      );
  }

  private searchById(id: string): Observable<any> {
    if (!id) return of(null);
    return this.http
      .get<any>(`${this.apiUrl}/products/${id}`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(catchError(() => of(null)));
  }

  private localSearch(query: string): any[] {
    const lowerQuery = query.toLowerCase();
    return this.allProducts.filter((product) =>
      product.name?.toLowerCase().includes(lowerQuery) ||
      product.category?.name?.toLowerCase().includes(lowerQuery) ||
      product._id?.toLowerCase().includes(lowerQuery)
    );
  }
}
