import { Component, OnInit } from '@angular/core';
import { ProductReadDto } from 'src/app/shared/model/api-models';
import { ProductsService } from '../products.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-partner-products',
  templateUrl: './partner-products.component.html',
  styleUrls: ['./partner-products.component.scss']
})
export class PartnerProductsComponent implements OnInit {

  products: ProductReadDto[] = [];
  partnerName: string = '';

  loggedUser = {
    firstName: '',
    lastName: ''
  }

  constructor(
    private modalService: NgbModal,
    public authService: AuthService,
    public http: HttpClient,
    public toastService: ToastService,
    private productService: ProductsService, 
    private route: ActivatedRoute,
  ) {  
    this.updateAuthenticationState();
  }

  private updateAuthenticationState() {
    if (this.isUserLoggedIn()) {
      this.loggedUser = this.authService.getLoggedUser();
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const partnerName = params['partner'];
      console.log('name: ', partnerName);
      this.productService.getProductsFromPartner(partnerName).subscribe(products => {
        this.products = products;
      })
    })
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }

  isUserLoggedIn(): any {
    return this.authService.isUserLogged();
  }

  logOut(): void {
    this.authService.logOut();
    // this.updateAuthenticationState();
    this.toastService.showInfo('logged out');
  }

  getRole(): string {
    return localStorage.getItem('role') || '';
  }
  
  openSettings(modal: any) {
    this.modalService.open(modal);
  }

}
