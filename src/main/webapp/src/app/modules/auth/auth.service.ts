import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthRequestDto, RegisterUserDto } from 'src/app/shared/model/api-models';


export interface AuthResponse { // todo move this to another file with all other dto's
  token: string;
  role: string;
  expirationDate: string;
  firstName: string;
  lastName: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedUser = {
    firstName: '',
    lastName: ''
  }

  apiUrl: string = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  isTokenExpired(): boolean {
    const expirationDateStr = localStorage.getItem('expirationDate');

    if (expirationDateStr) {
      const expirationDate = new Date(expirationDateStr);
      return expirationDate <= new Date(); //less than
    }
    return true; // Token expiration information not found
  }

  isUserLogged(): boolean {
    return localStorage.getItem('authToken') ? true : false;
  }

  logIn(loginObj: AuthRequestDto) {
    return this.http.post(`${this.apiUrl}/api/auth/authenticate`, loginObj);
  }

  // log in
  setLoggedUser(responseObj: AuthResponse): void {
    localStorage.clear()
    localStorage.setItem('authToken', responseObj.token);
    localStorage.setItem('role', responseObj.role);
    localStorage.setItem('expirationDate', responseObj.expirationDate);
    localStorage.setItem('firstName', responseObj.firstName);
    localStorage.setItem('lastName', responseObj.lastName);

    console.log(responseObj)
  }

  getLoggedUser() {
    const firstName = localStorage.getItem('firstName') || '';
    const lastName = localStorage.getItem('lastName') || '';

    this.loggedUser.firstName = firstName;
    this.loggedUser.lastName = lastName;
    return this.loggedUser;
  }

  logOut(): void {
    localStorage.clear();
  }

  registerUser(user: RegisterUserDto) {
    return this.http.post<RegisterUserDto>(`${this.apiUrl}/api/auth/register/user`, user);
  }

}
