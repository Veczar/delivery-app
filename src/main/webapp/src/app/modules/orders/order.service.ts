import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDto, OrderReadDto } from 'src/app/shared/model/api-models';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  apiUrl: string = "http://localhost:8080";
  
  constructor(private http: HttpClient) {}

  getOrders(): Observable<OrderDto[]> {
    return this.http.get<OrderDto[]>(`${this.apiUrl}/api/orders`);
  }
  getOrdersAssignedToCourier(email: string): Observable<OrderReadDto[]> {
    return this.http.get<OrderReadDto[]>(`${this.apiUrl}/api/orders/assigned/`+email);
  }
  updateOrder(order: OrderDto): Observable<OrderDto> {
    return this.http.put<OrderDto>(`${this.apiUrl}/api/orders/${order.id}`, order);
  }
  setStatus(order: OrderReadDto): Observable<OrderReadDto> {
    return this.http.put<OrderReadDto>(`${this.apiUrl}/api/orders/make-done/${order.id}`, order.status);
  }
  deleteOrder(orderId: number): Observable<OrderDto> {
    return this.http.delete<OrderDto>(`${this.apiUrl}/api/orders/${orderId}`);
  }

  makeOrder(order: OrderDto): Observable<OrderDto> {
    return this.http.post<OrderDto>(`${this.apiUrl}/api/orders`, order);
  }
}