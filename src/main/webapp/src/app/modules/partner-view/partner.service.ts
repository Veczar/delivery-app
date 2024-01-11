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
  getPartnersAll():Observable<PartnerDto[]> {
  return this.http.get<PartnerDto[]>(`/api/partners`);
  }
  deletePartner(id: number): Observable<PartnerDto> {
    return this.http.delete<PartnerDto>(`/api/partners/${id}`);
  }
  getPartnerById(id: number): Observable<PartnerDto> {
    return this.http.get<PartnerDto>(`/api/partners/${id}`);
  }
  updatePartner(partner: PartnerDto): Observable<PartnerDto> {
    return this.http.put<PartnerDto>(`/api/partners/${partner.id}`, partner);
  }
}
