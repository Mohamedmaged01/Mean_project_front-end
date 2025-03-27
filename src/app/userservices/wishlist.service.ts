import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { catchError, tap, finalize } from 'rxjs/operators';
import { Product } from '../../../interfaces/Product_model'

interface WishlistResponse {
  message: string;
  wishlist: Product[];
}
@Injectable({
  providedIn: 'root'
})

export class WishlistService {

  
  private allWishlistItems: Product[] = [];
  private wishlistItemsSubject = new BehaviorSubject<Product[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);
  private totalItemsSubject = new BehaviorSubject<number>(0);
  private totalPagesSubject = new BehaviorSubject<number>(0);
  private currentPageSubject = new BehaviorSubject<number>(1);

  wishlistItems$ = this.wishlistItemsSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();
  error$ = this.errorSubject.asObservable();
  totalItems$ = this.totalItemsSubject.asObservable();
  totalPages$ = this.totalPagesSubject.asObservable();
  currentPage$ = this.currentPageSubject.asObservable();

  private apiUrl = 'http://localhost:3000';
  private pageSize: number = 10;

  constructor(private http: HttpClient) {
    this.loadWishlist();
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }
    return new HttpHeaders({
      'token': token
    });
  }

  getWishlist(): Product[] {
    return [...this.allWishlistItems];
  }

  loadWishlist(): void {
    this.setLoading(true);
    this.clearError();

    const headers = this.getAuthHeaders();
    this.http.get<WishlistResponse>(`${this.apiUrl}/allwishlist`, { headers })
      .pipe(
        tap(response => {
          this.allWishlistItems = response.wishlist; 
          this.totalItemsSubject.next(response.wishlist.length);
          this.totalPagesSubject.next(Math.ceil(response.wishlist.length / this.pageSize));
          this.goToPage(1);
        }),
        catchError(this.handleError('Failed to load wishlist')),
        finalize(() => this.setLoading(false))
      )
      .subscribe();
  }

  addToWishlist(product: Product): Observable<any> {
    this.setLoading(true);
    this.clearError();

    const headers = this.getAuthHeaders();
    const body = {
      wishlist: [product._id]
    };

    return this.http.post(`${this.apiUrl}/addtowishlist`, body, { headers })
      .pipe(
        tap(() => this.loadWishlist()),
        catchError(this.handleError('Failed to add to wishlist')),
        finalize(() => this.setLoading(false))
      );
  }

  removeFromWishlist(product: Product): Observable<any> {
    this.setLoading(true);
    this.clearError();

    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.apiUrl}/deletefromwishlist/${product._id}`, { headers })
      .pipe(
            tap(() =>{ 
              
              this.allWishlistItems = this.allWishlistItems.filter(item => item._id !== product._id);
              this.wishlistItemsSubject.next([...this.allWishlistItems]);
              if (this.allWishlistItems.length === 0) {
                this.wishlistItemsSubject.next([]);
                this.totalItemsSubject.next(0);
                this.totalPagesSubject.next(0);
              }
              }),
        catchError(this.handleError('Failed to remove from wishlist')),
        finalize(() => this.setLoading(false))
      );
  }

  goToPage(page: number, pageSize: number = this.pageSize): void {
    this.pageSize = pageSize;
    const totalPages = Math.ceil(this.allWishlistItems.length / pageSize);

    if (page >= 1 && page <= totalPages) {
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedItems = this.allWishlistItems.slice(startIndex, endIndex);

      this.wishlistItemsSubject.next(paginatedItems);
      this.currentPageSubject.next(page);
      this.totalPagesSubject.next(totalPages);
    }
  }

  clearError(): void {
    this.errorSubject.next(null);
  }

  private setLoading(loading: boolean): void {
    this.loadingSubject.next(loading);
  }

  private setError(error: string): void {
    this.errorSubject.next(error);
  }

  private handleError(message: string) {
    return (error: HttpErrorResponse): Observable<never> => {
      let errorMessage = message;
      if (error.error instanceof ErrorEvent) {
        errorMessage = `${message}: ${error.error.message}`;
      } else {
        errorMessage = `${message}: ${error.status} - ${
          error.error?.message || error.message
        }`;
        switch (error.status) {
          case 401:
            errorMessage = 'Unauthorized - Please login again';
            break;
          case 404:
            errorMessage = 'Resource not found';
            break;
          case 500:
            errorMessage = 'Server error - Please try again later';
            break;
        }
      }
      this.setError(errorMessage);
      return throwError(() => new Error(errorMessage));
    };
  }
}