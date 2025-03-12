import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private API_URL = 'http://localhost:3000/allcategory';
  
  constructor(private http: HttpClient) {}
  
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Headers': `${token}` 
    });
  }
  
  getCategories(): Observable<any> {
    return this.http.get<any>(this.API_URL, { headers: this.getHeaders() });
  }
  
  addCategory(categoryData: any): Observable<any> {
    return this.http.post(this.API_URL, categoryData, { headers: this.getHeaders() });
  }
}