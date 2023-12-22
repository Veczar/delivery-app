import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/toast/toast.service';


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
    private router: Router,
    private toastService: ToastService
  ) {}

  onLogin() {
    console.log(this.loginObj)
    this.authService.logIn(this.loginObj).subscribe((result) => {
      this.authService.setLoggedUser(result);
      this.router.navigate(['']);
      this.toastService.show('Logged in', { classname: 'bg-success text-light', delay: 3000 });
    }),
    (error: any) => {
      console.error('Authentication failed:', error);
    };
  }
}
