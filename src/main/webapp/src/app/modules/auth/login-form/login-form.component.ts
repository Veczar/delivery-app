import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

interface User {
  id: number;
  firstName: string;
  lastName: string;
}


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  private apiUrl = 'http://localhost:8080';
  data: User[] = [];

  loginObj = {
    email: '',
    password: ''
  };

  responseObj = {
    token: '',
    role: '',
    expirationDate: ''
  };

  constructor(private http: HttpClient) {}

  onLogin() {
    console.log(this.loginObj)

    localStorage.clear()

    this.http.post(`${this.apiUrl}/api/auth/authenticate`, this.loginObj).subscribe((result: any) => {
      this.responseObj = result;
      
      localStorage.setItem('authToken', this.responseObj.token);
      localStorage.setItem('role', this.responseObj.role);
      localStorage.setItem('expirationDate', this.responseObj.expirationDate);
      
      console.log(this.responseObj)
    })
  }
  
}
