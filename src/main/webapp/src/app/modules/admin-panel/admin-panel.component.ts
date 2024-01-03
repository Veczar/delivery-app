import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent {

  loggedUser = {
    firstName: '',
    lastName: ''
  }

  constructor(
    private modalService: NgbModal,
    public authService: AuthService,
    public http: HttpClient,
    public toastService: ToastService,
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
    this.toastService.showInfo('logged out');
  }

  getRole(): string {
    return localStorage.getItem('role') || '';
  }
  
  openSettings(modal: any) {
    this.modalService.open(modal);
  }
}
