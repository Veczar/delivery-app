import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeliveryManDto } from 'src/app/shared/model/api-models';

@Injectable({
  providedIn: 'root'
})
export class CourierService {

  apiUrl: string = "http://localhost:8080";
  
  constructor(private http: HttpClient) {}

  getCouriers(): Observable<DeliveryManDto[]> {
    return this.http.get<DeliveryManDto[]>(`${this.apiUrl}/api/delivery_mans`);
  }

  updateCourier(user: DeliveryManDto): Observable<DeliveryManDto> {
    return this.http.put<DeliveryManDto>(`${this.apiUrl}/api/delivery_mans/${user.id}`, user);
  }

  deleteCourier(userId: number): Observable<DeliveryManDto> {
    return this.http.delete<DeliveryManDto>(`${this.apiUrl}/api/delivery_mans/${userId}`);
  }

}
