import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDto } from 'src/app/shared/model/api-models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl: string = "http://localhost:8080";
  
  constructor(private http: HttpClient) {

  }

  getUsers(): Observable<UserDto[]> {
    console.log('GET users:');
    return this.http.get<UserDto[]>(this.apiUrl + "/api/users");
  }

  getUserRoleUser() {
    return this.http.get<UserDto[]>(this.apiUrl + "/api/users/role/user");
  }

}
