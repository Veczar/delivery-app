import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { RouteService } from 'src/app/shared/route.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent {

  currentRoute: string = '';

  loggedUser = {
    firstName: '',
    lastName: ''
  }

  constructor(
    private modalService: NgbModal,
    public authService: AuthService,
    public http: HttpClient,
    public toastService: ToastService,
    public router: Router,
    private routeService: RouteService,
  ) {
    this.updateAuthenticationState();
  }

  private updateAuthenticationState() {
    if (this.isUserLoggedIn()) {
      this.loggedUser = this.authService.getLoggedUser();
    }

    this.routeService.getCurrentRoute().subscribe((route) => {
      this.currentRoute = route;
    });
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
    console.log(this.currentRoute)
    if (this.currentRoute.startsWith('/admin')) {
      this.router.navigate(['/']);
    }
    this.toastService.showInfo('logged out');
  }

  getRole(): string {
    return localStorage.getItem('role') || '';
  }
  
  openSettings(modal: any) {
    this.modalService.open(modal);
  }
}
