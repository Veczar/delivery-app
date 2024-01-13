import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../modules/auth/auth.service';
import { ToastService } from '../shared/toast/toast.service';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss']
})
export class FrontPageComponent {

  cityName: string = '';

  constructor(
    private router: Router,
    public authService: AuthService,
    public http: HttpClient,
    public toastService: ToastService,
  ) {}

  onSearch() {
    console.log(this.cityName);
    this.router.navigate(['/partners/', this.cityName]);
  }
  
}
