import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthRequestDto, AuthResponseDto, RegisterPartnerDto, RegisterResponseDto, RegisterUserDto } from 'src/app/shared/model/api-models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedUser = {
    firstName: '',
    lastName: ''
  }

  apiUrl: string = 'http://localhost:8080';

  constructor(
    private http: HttpClient,
  ) { }
  

  registerUser(user: RegisterUserDto): Observable<RegisterResponseDto> {
    return this.http.post(`${this.apiUrl}/api/auth/register/user`, user);
  }

  registerParnter(partner: RegisterPartnerDto): Observable<RegisterResponseDto> {
    return this.http.post(`${this.apiUrl}/api/auth/register/partner`, partner);

  }

  logIn(loginObj: AuthRequestDto): Observable<AuthResponseDto> {
    return this.http.post(`${this.apiUrl}/api/auth/authenticate`, loginObj);
  }

  setLoggedUser(responseObj: AuthResponseDto): void {
    localStorage.clear()
    localStorage.setItem('authToken', responseObj.token || '');
    localStorage.setItem('role', responseObj.role || '');
    localStorage.setItem('expirationDate', responseObj.expirationDate || '');
    localStorage.setItem('firstName', responseObj.firstName || '');
    localStorage.setItem('lastName', responseObj.lastName || '');

    console.log(responseObj)
  }

  isUserLogged(): boolean {
    return localStorage.getItem('authToken') ? true : false;
  }

  getLoggedUser() {
    const firstName = localStorage.getItem('firstName') || '';
    const lastName = localStorage.getItem('lastName') || '';

    this.loggedUser.firstName = firstName;
    this.loggedUser.lastName = lastName;
    return this.loggedUser;
  }

  isTokenExpired(): boolean {
    const expirationDateStr = localStorage.getItem('expirationDate');

    if (expirationDateStr) {
      const expirationDate = new Date(expirationDateStr);
      return expirationDate <= new Date(); //less than
    }
    return true; // Token expiration information not found
  }

  logOut(): void {
    localStorage.clear();
  }
}
