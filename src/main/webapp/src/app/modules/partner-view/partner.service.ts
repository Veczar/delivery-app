import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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
  getPartnersSearch(city: string, searchTerm: string): Observable<PartnerReadDto[]> {
    return this.http.get<PartnerReadDto[]>(`/api/partners/search/${city}/${searchTerm}`);
  }

  
  private searchTermSubject = new BehaviorSubject<string>('');
  searchTerm$ = this.searchTermSubject.asObservable();

  updateSearchTerm(searchTerm: string): void {
    this.searchTermSubject.next(searchTerm);
  }

}
