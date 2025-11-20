import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../Models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'https://neelakandan-app-hcgmcxdch2ftcah2.centralindia-01.azurewebsites.net/api/Products';

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/GetProduct`, this.getAuthHeaders());
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/GetProductByID/${id}`, this.getAuthHeaders());
  }

  createProduct(product: Product): Observable<any> {
    return this.http.post(`${this.apiUrl}/CreateProduct`, product, this.getAuthHeaders());
  }

  updateProduct(id: number, product: Product): Observable<any> {
    return this.http.put(`${this.apiUrl}/UpdateProduct/id=${id}`, product, this.getAuthHeaders());
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/DeleteProduct/id=${id}`, this.getAuthHeaders());
  }
}
