import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductDto } from 'src/app/shared/model/api-models';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  apiUrl: string = "http://localhost:8080";
  
  constructor(private http: HttpClient) {}

  getProducts(): Observable<ProductDto[]> {
    return this.http.get<ProductDto[]>(`${this.apiUrl}/api/products/`);
  }

  getProduct(id: number): Observable<ProductDto> {
    return this.http.get<ProductDto>(`${this.apiUrl}/api/products/${id}`);
  }

  updateProduct(product: ProductDto): Observable<ProductDto> {
    return this.http.put<ProductDto>(`${this.apiUrl}/api/products/${product.id}`, product);
  }

  deleteProduct(productId: number): Observable<ProductDto> {
    return this.http.delete<ProductDto>(`${this.apiUrl}/api/products/${productId}`);
  }
}
