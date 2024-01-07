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

  private searchTermSubject = new BehaviorSubject<string>('');
  searchTerm$ = this.searchTermSubject.asObservable();

  private citySource = new BehaviorSubject<string>('');
  currentCity = this.citySource.asObservable();

  private partnersDataSubject = new BehaviorSubject<PartnerReadDto[]>([]);
  public partners$ = this.partnersDataSubject.asObservable();

  getPartners():Observable<PartnerReadDto[]> {
    return this.http.get<PartnerReadDto[]>(`/api/partners`);
  }
  getPartnersCity(city: string): Observable<PartnerReadDto[]> {
    return this.http.get<PartnerReadDto[]>(`/api/partners/city/${city}`);
  }
  getPartnersSearch(city: string, searchTerm: string): Observable<PartnerReadDto[]> {
    return this.http.get<PartnerReadDto[]>(`/api/partners/search/${city}/${searchTerm}`);
  }

  setPartnersData(partners: PartnerReadDto[]): void {
    this.partnersDataSubject.next(partners);
  }
  getPartnersData(): Observable<PartnerReadDto[]> {
    return this.partnersDataSubject.asObservable();
  }

  updateSearchTerm(searchTerm: string): void {
    this.searchTermSubject.next(searchTerm);
  }
  getSearchTerm(searchTerm: string): string {
    return this.searchTermSubject.getValue();
  }

  updateCity(city: string): void {
    this.citySource.next(city);
  }
  getCity(city: string): string {
    return this.citySource.getValue();
  }

}
