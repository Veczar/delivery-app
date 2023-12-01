import { Injectable } from '@angular/core';


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

  constructor() { }

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

  logOut() {
    localStorage.clear();
  }

}
