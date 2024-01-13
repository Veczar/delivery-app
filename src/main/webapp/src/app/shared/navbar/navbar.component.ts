import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { PartnerService } from 'src/app/modules/partner/partner.service';
import { ShoppingCartService } from 'src/app/shared/navbar/shopping-cart/shopping-cart.service';
import { RouteService } from '../route.service';
import { ToastService } from '../toast/toast.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
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
    private shoppingCartService: ShoppingCartService,
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

  getTotal(): number {
    return this.shoppingCartService.getTotalPrice();
  }
}
