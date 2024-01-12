import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecurringOrderDto } from 'src/app/shared/model/api-models';

@Injectable({
  providedIn: 'root'
})
export class RecurringOrdersService {

  apiUrl: string = "http://localhost:8080/api/recurring_orders";
  
  constructor(private http: HttpClient) {}

  getRecurringOrders(): Observable<RecurringOrderDto[]> {
    return this.http.get<RecurringOrderDto[]>(`${this.apiUrl}`);
  }

  getRecurringOrder(id: number): Observable<RecurringOrderDto> {
    return this.http.get<RecurringOrderDto>(`${this.apiUrl}/${id}`);
  }

  makeRecurringOrder(recurringOrder: RecurringOrderDto): Observable<RecurringOrderDto> {
    return this.http.post<RecurringOrderDto>(`${this.apiUrl}`, recurringOrder);
  }

  updateRecurringOrder(recurringOrder: RecurringOrderDto): Observable<RecurringOrderDto> {
    return this.http.put<RecurringOrderDto>(`${this.apiUrl}/${recurringOrder.id}`, recurringOrder);
  }

  deleteRecurringOrder(id: number): Observable<RecurringOrderDto> {
    return this.http.delete<RecurringOrderDto>(`${this.apiUrl}/${id}`);
  }
}
