import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PartnerReadDto } from 'src/app/shared/model/api-models';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {

  apiUrl: string = 'http://localhost:8080';

  private searchTerm: string = '';

  private currenCity = new BehaviorSubject<string>('');
  currentCity = this.currenCity.asObservable();

  partnersData: PartnerReadDto[] = [];
  partnersDataSubject: BehaviorSubject<PartnerReadDto[]> = new BehaviorSubject<PartnerReadDto[]>([]);

  private filteredPartnersDataSubject = new BehaviorSubject<PartnerReadDto[]>([]);
  public filteredPartnersData$ = this.filteredPartnersDataSubject.asObservable();
  

  constructor(
    private http: HttpClient,
  ) { }

  getPartnersObs(){
    console.log('----- fetch from database -----');
    this.http.get<PartnerReadDto[]>(`/api/partners/read`).subscribe(partners => {
      this.partnersDataSubject.next(partners);
      this.partnersData = partners;
    });
  }
  
  getPartnersData(): PartnerReadDto[] {
    return this.partnersData;
  }

  updateSearchTerm(searchTerm: string): void {
    this.searchTerm = searchTerm;
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
