import { BootstrapOptions, Component } from '@angular/core';
import { NgbModal, NgbToast, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../modules/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { ToastService } from '../shared/toast/toast.service';

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

  onSearch() {
    console.log(this.cityName);
  }
  
  openSettings(modal: any) {
    this.modalService.open(modal);
  }

  onToast() {
    this.toastService.showInfo('info');
    this.toastService.showSuccess('Yeah buddy!!!');
    this.toastService.showError('error');
  }
}
