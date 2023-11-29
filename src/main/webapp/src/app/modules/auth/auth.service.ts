import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isTokenExpired(): boolean {
    const expirationDateStr = localStorage.getItem('expirationDate');

    if (expirationDateStr) {
      const expirationDate = new Date(expirationDateStr);
      return expirationDate <= new Date(); //less than
    }
    return true; // Token expiration information not found
  }
}
