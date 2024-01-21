import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../modules/auth/auth.service';
import { ToastService } from '../toast/toast.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdsService } from '../ADBlockerDetector';

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
    public modalService: NgbModal,
  ) {}

  onSearch() {
    console.log(this.cityName);
    this.router.navigate(['/partners/', this.cityName]);
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }

  isUserLoggedIn(): any {
    return this.authService.isUserLogged();
  }

  getRole(): string {
    return localStorage.getItem('role') || '';
  }
  
}
