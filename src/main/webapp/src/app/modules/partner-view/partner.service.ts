import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {  RegisterPartnerDto, RegisterResponseDto, PartnerDto,PartnerReadDto } from 'src/app/shared/model/api-models';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {

  apiUrl: string = 'http://localhost:8080';

  constructor(
    private http: HttpClient,
  ) { }
  
  getPartners(city: string): Observable<PartnerReadDto[]> {
    return this.http.get<PartnerReadDto[]>(`/api/partners/city/${city}`);
  }
  getPartnersSearch(city: string, name: string): Observable<PartnerReadDto[]> {
    return this.http.get<PartnerReadDto[]>(`/api/partners/city/${city}/name/${name}`);
  }
}
