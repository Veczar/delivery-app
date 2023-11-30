import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../modules/auth/auth.service';
import { UserService } from '../modules/user/user.service';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss']
})
export class FrontPageComponent {

  loggedUser = {
    firstName: '',
    lastName: ''
  }

  constructor(
    private modalService: NgbModal,
    private router: Router,
    public authService: AuthService,
  ) {
    this.updateAuthenticationState();
  }

  private updateAuthenticationState() {
    const isUserLoggedIn = this.isUserLoggedIn();

    if (isUserLoggedIn) {
      this.loggedUser = this.authService.getLoggedUser();
    }
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }

  navigateToAuth() {
    this.router.navigate(['/auth']);
  }

  isUserLoggedIn(): any {
    return this.authService.isUserLogged();
  }

  logOut() {
  this.authService.logOut();
  this.updateAuthenticationState();
  }

}
