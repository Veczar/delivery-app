import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent  {

  private apiUrl = 'http://localhost:8080';

  loginObj = {
    email: '',
    password: ''
  };

  constructor(private http: HttpClient, private authService: AuthService) {}

  onLogin() {
    console.log(this.loginObj)
    this.http.post(`${this.apiUrl}/api/auth/authenticate`, this.loginObj).subscribe((result: any) => {
      this.authService.setLoggedUser(result);
    }),
    (error: any) => {
      console.error('Authentication failed:', error);
    };
  }

}
