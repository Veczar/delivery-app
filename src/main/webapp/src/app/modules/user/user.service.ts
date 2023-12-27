import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDto } from 'src/app/shared/model/api-models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl: string = "http://localhost:8080";
  
  constructor(private http: HttpClient) {}

  getUsers(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(`${this.apiUrl}/api/users/`);
  }

  getUser(id: number): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.apiUrl}/api/users/${id}`);
  }

  getUserRoleUser(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(`${this.apiUrl}/api/users/role/user`);
  }

  updateUser(user: UserDto): Observable<UserDto> {
    return this.http.put<UserDto>(`${this.apiUrl}/api/users/${user.id}`, user);
  }

  deleteUser(userId: number): Observable<UserDto> {
    return this.http.delete<UserDto>(`${this.apiUrl}/api/users/${userId}`);
  }

}
