import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ComplaintDto, ComplaintReadDto } from 'src/app/shared/model/api-models';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  apiUrl: string = "http://localhost:8080";
  
  constructor(private http: HttpClient) {}

  getComplaints(): Observable<ComplaintDto[]> {
    return this.http.get<ComplaintDto[]>(`${this.apiUrl}/api/complaints/`);
  }
  
  getComplaintsRead(): Observable<ComplaintReadDto[]> {
    return this.http.get<ComplaintReadDto[]>(`${this.apiUrl}/api/complaints/read`);
  }

  updateUser(user: ComplaintDto): Observable<ComplaintDto> {
    return this.http.put<ComplaintDto>(`${this.apiUrl}/api/complaints/${user.id}`, user);
  }

  addComplaint(complaint: ComplaintDto): Observable<ComplaintDto> {
    return this.http.post<ComplaintDto>(`${this.apiUrl}/api/complaints`, complaint);
  }

  deleteUser(userId: number): Observable<ComplaintDto> {
    return this.http.delete<ComplaintDto>(`${this.apiUrl}/api/complaints/${userId}`);
  }
}
