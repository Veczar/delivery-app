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

  private searchTerm:string = '';
  

  private citySource:string ='';

  private currenCity = new BehaviorSubject<string>(localStorage.getItem('userCity') || '');
  currentCity = this.currenCity.asObservable();

  private partnersData:PartnerReadDto[] = [];

  private filteredPartnersDataSubject = new BehaviorSubject<PartnerReadDto[]>([]);
  public filteredPartnersData$ = this.filteredPartnersDataSubject.asObservable();
  

  getPartners():Observable<PartnerReadDto[]> {
    return this.http.get<PartnerReadDto[]>(`/api/partners/read`);
  }
  
  setPartnersData(partners: PartnerReadDto[]): void {
    this.partnersData = partners;
  }
  getPartnersData(): PartnerReadDto[] {
    return this.partnersData;
  }

  updateSearchTerm(searchTerm: string): void {
    this.searchTerm=searchTerm;
  }
  getSearchTerm(): string {
    return this.searchTerm;
  }

  updateCity(city: string): void {
    this.citySource = city;
  }
  getCity(): string {
    return this.citySource;
  }
  updateCurrentCity(city: string): void {
    this.currenCity.next(city);
    localStorage.setItem('userCity', city);
  }
  
  setFilteredPartnersData(partners: PartnerReadDto[]): void {
    this.filteredPartnersDataSubject.next(partners);
  }

}
