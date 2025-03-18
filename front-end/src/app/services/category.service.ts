import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private API_URL = 'http://localhost:3000/allcategory';
  
  constructor(private http: HttpClient) {}
  
  // private getHeaders(): HttpHeaders {
  //   const token = localStorage.getItem('token');
    
  //   // Debug: Check if token exists
  //   console.log('Token exists:', !!token);
    
  //   let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
  //   if (token) {
  //     // Check with your API whether it needs "Bearer " prefix
  //     headers = headers.set('token', `${token}`);
  //     console.log('Authorization header set:', headers.has('Authorization'));
  //   } else {
  //     console.warn('No token found in localStorage');
  //   }
    
  //   return headers;
  // }
  
  getCategories(): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error("No token found! User may need to log in.");
      return throwError(() => new Error("No token available. Please log in."));
    }
    
    return this.http.get<any>(this.API_URL);
  }
  
  addCategory(categoryData: any): Observable<any> {
    return this.http.post(this.API_URL, categoryData);
  }

  API_URL1 = 'http://localhost:3000/deletecategory';

  deleteCategory(categoryId: any): Observable<any> {
    return this.http.delete(`${this.API_URL1}/${categoryId}`);
  }


  API_URL2 = 'http://localhost:3000/getcategorybyid';

  getCategoryDetails(categoryId: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL2}/${categoryId}`);
  }


  API_URL3 = 'http://localhost:3000/updatecategory';
  updateCategoryDetails(categoryData: any, categoryId: number): Observable<any> {
    return this.http.post(`${this.API_URL3}/${categoryId}`, categoryData);
  }
  
}