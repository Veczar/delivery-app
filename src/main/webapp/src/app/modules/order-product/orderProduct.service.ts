import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductOrderDto } from 'src/app/shared/model/api-models';

@Injectable({
  providedIn: 'root'
})
export class OrderProductService {

  apiUrl: string = "http://localhost:8080";
  
  constructor(private http: HttpClient) {}

  getOrdersProducts(): Observable<ProductOrderDto[]> {
    return this.http.get<ProductOrderDto[]>(`${this.apiUrl}/api/product_order`);
  }
  getOrdersProductsAssignedToUser(id?:number): Observable<ProductOrderDto[]> {
    return this.http.get<ProductOrderDto[]>(`${this.apiUrl}/api/product_order/my-orders/`+id);
  }
  updateOrderProduct(productOrder: ProductOrderDto): Observable<ProductOrderDto> {
    return this.http.put<ProductOrderDto>(`${this.apiUrl}/api/product_order/${productOrder.product?.id}/${productOrder.order?.id}`, productOrder);
  }
  deleteOrderProduct(productOrder: ProductOrderDto): Observable<ProductOrderDto> {
    return this.http.delete<ProductOrderDto>(`${this.apiUrl}/api/orders/${productOrder.product?.id}/${productOrder.order?.id}`);
  }

}