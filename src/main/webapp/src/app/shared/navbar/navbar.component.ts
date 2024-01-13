import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { OrdersViewModule } from "../../modules/orders/orders-view.module";
import { UserModule } from "../../modules/user/user.module";
import { RouteService } from '../route.service';
import { ToastService } from '../toast/toast.service';
import { PartnerService } from 'src/app/modules/partner/partner.service';

@Component({
    standalone: true,
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    imports: [
        BrowserModule,
        AppRoutingModule,
        OrdersViewModule,
        UserModule,
        FormsModule
    ]
})
export class NavbarComponent implements OnInit {
  cityName: string = '';
  currentRoute: string = '';
  newAddress: string = '';

  loggedUser = {
    firstName: '',
    lastName: ''
  }

  @Output()
  dataChangedEvent = new EventEmitter<string>();


  constructor(
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    public authService: AuthService,
    public http: HttpClient,
    public toastService: ToastService,
    private routeService: RouteService,
    private partnerService: PartnerService,
  ) { }

  ngOnInit(): void {
    this.updateAuthenticationState();
    this.partnerService.getCurrentCity().subscribe(city => {
      this.cityName = city;
    })
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
    this.toastService.showInfo('logged out');
  }

  getRole(): string {
    return localStorage.getItem('role') || '';
  }

  onSearch() {
    console.log(this.cityName);
    this.router.navigate(['/partners/', this.cityName]);
  }

  openSettings(modal: any) {
    this.modalService.open(modal);
  }

  partnersRoute() {
    return this.currentRoute.startsWith('/partners');
  }

  changeAddress() {
    // this.cityName = this.newAddress;
    this.partnerService.setCurrentCity(this.newAddress);
    this.dataChangedEvent.emit(this.newAddress)
  }
}
