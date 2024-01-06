import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PartnerService } from './partner.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { filter } from 'rxjs';



@Component({
  selector: 'app-partner-view',
  templateUrl: './partner-view.component.html',
  styleUrls: ['./partner-view.component.scss']
})

export class PartnerViewComponent {

  searchTerm: string = '';
  searchActivated: boolean = false;
  citySearch: string = '';
  cityName: string = '';
  currentCity: string = '';
  newAddress: string = '';

  loggedUser = {
    firstName: '',
    lastName: ''
  }

  constructor(
    public authService: AuthService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private router: Router,
    private partnerService: PartnerService,
    public http: HttpClient) {
      this.updateAuthenticationState();
    }

    ngOnInit(): void {
      
      this.partnerService.currentCity.subscribe(city => {
        this.cityName = city;
        this.setCity(this.cityName);
        console.log('City name: ',this.cityName);
      });

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


    changeAddress(): void {
      // Tutaj możesz dodać logikę do zapisywania nowego adresu
      this.setCity(this.newAddress);
      this.partnerService.updateCity(this.newAddress);
      console.log('New Address:', this.newAddress);

      this.router.navigate(['/partners/', this.newAddress]);
      
      // Zamknij modal po zapisie
      this.modalService.dismissAll();
    }

    goToAllPartners(): void {
      this.router.navigate(['/partners']);
      this.partnerService.updateCity('');
    }

    setCity(city: string): void {
      this.currentCity = city;
      localStorage.setItem('userCity', city);
    }

    getCity(): string {
      return this.currentCity;
    }


    search(searchTerm: string): void {
      this.currentCity = this.getCity();
      this.citySearch = searchTerm;

      // console.log('searchTerm:', this.citySearch);
      // console.log('cityName:', this.currentCity);

      if (this.cityName === '' || this.cityName === null ){
          console.error('Unable to determine city.');
      } else if(this.citySearch === ''|| this.citySearch === null){
        this.partnerService.updateSearchTerm(this.citySearch);
        this.router.navigate(['/partners/', this.cityName]);
      } else if (this.cityName !== null) {
        
        this.partnerService.updateSearchTerm(this.citySearch);
        this.router.navigate(['/partners/search/', this.cityName, this.citySearch]);
        this.searchActivated = true;
      }
    }



}
