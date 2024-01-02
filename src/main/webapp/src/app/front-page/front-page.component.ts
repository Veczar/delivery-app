import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../modules/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss']
})
export class FrontPageComponent {
  cityName: string = '';

  loggedUser = {
    firstName: '',
    lastName: ''
  }

  constructor(
    private modalService: NgbModal,
    private router: Router,
    public authService: AuthService,
    public http: HttpClient
  ) {
    this.updateAuthenticationState();
  }

  private updateAuthenticationState() {
    if (this.isUserLoggedIn()) {
      this.loggedUser = this.authService.getLoggedUser();
    }
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }

  isUserLoggedIn(): any {
    return this.authService.isUserLogged();
  }

  logOut(): void {
    this.authService.logOut();
    this.updateAuthenticationState();
  }

  getRole(): string {
    return localStorage.getItem('role') || '';
  }

  onSearch() {
    console.log(this.cityName);
    this.router.navigate(['/partners/', this.cityName]);
  }

}
