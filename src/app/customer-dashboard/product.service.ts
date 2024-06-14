import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/api/products'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  saveProducts(products: any[]): Observable<any> {
    return this.http.post<any>(this.apiUrl, products);
  }
}
