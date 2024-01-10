import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PartnerDto, PartnerReadDto } from 'src/app/shared/model/api-models';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {

  apiUrl: string = 'http://localhost:8080';

  currenCity = new BehaviorSubject<string>('');
  currentCity = this.currenCity.asObservable();

  private partnersData: PartnerReadDto[] = [];

  partnersSubject: BehaviorSubject<PartnerReadDto[]> = new BehaviorSubject<PartnerReadDto[]>([]);

  constructor(
    private http: HttpClient,
  ) { }

  getPartnersObs(){
    // console.log('----- fetch from database obs -------');
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
