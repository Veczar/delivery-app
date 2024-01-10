import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {  RegisterPartnerDto, RegisterResponseDto, PartnerDto,PartnerReadDto } from 'src/app/shared/model/api-models';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {

  apiUrl: string = 'http://localhost:8080';

  private searchTerm: string = '';

  // private currenCity = new BehaviorSubject<string>(localStorage.getItem('userCity') || '');
  currenCity = new BehaviorSubject<string>('');
  currentCity = this.currenCity.asObservable();

  private partnersData: PartnerReadDto[] = [];

  partnersSubject: BehaviorSubject<PartnerReadDto[]> = new BehaviorSubject<PartnerReadDto[]>([]);

  private filteredPartnersDataSubject = new BehaviorSubject<PartnerReadDto[]>([]);
  public filteredPartnersData$ = this.filteredPartnersDataSubject.asObservable();
  

  constructor(
    private http: HttpClient,
  ) { }

  getPartnersObs(){
    console.log('----- fetch from database obs -------');
    this.http.get<PartnerReadDto[]>(`/api/partners/read`).subscribe(partners => {
      this.partnersSubject.next(partners);
      this.partnersData = partners;
    });
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

  updateCurrentCity(city: string): void {
    this.currenCity.next(city);
    localStorage.setItem('userCity', city);
  }
  
  setFilteredPartnersData(partners: PartnerReadDto[]): void {
    this.filteredPartnersDataSubject.next(partners);
  }

}
