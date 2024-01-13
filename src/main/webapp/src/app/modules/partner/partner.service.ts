import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PartnerReadDto, PartnerDto } from 'src/app/shared/model/api-models';
import { BehaviorSubject, Observable } from 'rxjs';

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

  getCurrentCity() {
    return this.currentCity;
  }

  setCurrentCity(city: string) {
    this.currenCity.next(city);
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

  getPartners():Observable<PartnerDto[]> {
    return this.http.get<PartnerDto[]>(`/api/partners`);
  }

  getPartnerById(id: number): Observable<PartnerDto> {
    return this.http.get<PartnerDto>(`/api/partners/${id}`);
  }

  getPartnerByName(name: string): Observable<PartnerDto> {
    return this.http.get<PartnerDto>(`/api/partners/name/${name}`);
  }
  
  updatePartner(partner: PartnerDto): Observable<PartnerDto> {
    return this.http.put<PartnerDto>(`/api/partners/${partner.id}`, partner);
  }

  deletePartner(id: number): Observable<PartnerDto> {
    return this.http.delete<PartnerDto>(`/api/partners/${id}`);
  }
}
