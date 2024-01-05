import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent  {

  loginObj = {
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private location: Location
  ) {}

  onLogin() {
    console.log(this.loginObj)
    this.authService.logIn(this.loginObj).subscribe((result) => {
      this.authService.setLoggedUser(result);
      this.location.back(); // back to the site
      this.toastService.showSuccess('Logged in');
    }),
    (error: any) => {
      console.error('Authentication failed:', error);
    };
  }
}
