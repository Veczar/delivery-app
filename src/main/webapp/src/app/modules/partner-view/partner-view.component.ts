import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { PartnerService } from './partner.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { PartnerReadDto } from 'src/app/shared/model/api-models';



@Component({
  selector: 'app-partner-view',
  templateUrl: './partner-view.component.html',
  styleUrls: ['./partner-view.component.scss']
})

export class PartnerViewComponent implements OnInit, AfterViewInit {

  partners: PartnerReadDto[] = [];
  searchTerm: string = '';
  searchActivated: boolean = false;
  cityName!: string;
  currentCity: string = '';
  newAddress: string = '';
  flag: boolean = false;
  categoryActive: boolean = false;
  categoryActiveName: string | null = null;

  loggedUser = {
    firstName: '',
    lastName: ''
  }

  constructor(
    public authService: AuthService,
    private modalService: NgbModal,
    private router: Router,
    private partnerService: PartnerService,
    public http: HttpClient,
    private cd: ChangeDetectorRef
  ) {
    this.updateAuthenticationState();
  }

  ngAfterViewInit() {
    this.partnerService.currentCity.subscribe(city => {
      this.cityName = city;
    });

    this.cd.detectChanges() //to resolve NG0100 error
  }

  ngOnInit(): void {

    this.partnerService.getPartnersObs();

    this.partnerService.partnersSubject.subscribe(partners => {
      this.partners = partners;
    })

    this.router.events.subscribe(() => {
      // Pobierz aktualny adres URL
      const currentUrl = this.router.url;
      // Sprawdź, czy aktualny adres URL zawiera '/partners'
      if (currentUrl === '/partners') {
        // Wykonaj odpowiednie działania dla '/partners'
        this.flag = true;
      } else {
        this.flag = false;
      }
    });
  }

  changeAddress(): void {
    this.cityName = this.newAddress;
    this.partnerService.updateCurrentCity(this.newAddress);
    this.router.navigate(['/partners/', this.newAddress]);

    // Zamknij modal po zapisie
    this.modalService.dismissAll();
  }

  goToAllPartners(): void {
    this.router.navigate(['/partners']);
    this.partnerService.updateCurrentCity('');
    this.partners = this.partnerService.getPartnersData();
    this.categoryActiveName = '';
  }

  setCity(city: string): void {
    this.currentCity = city;
    localStorage.setItem('userCity', city);
  }

  getCity(): string {
    return this.currentCity;
  }


  search(searchTerm: string): void {
    if (this.cityName === '' || this.cityName === null) {

      if (this.flag) {
        this.filterPartners(searchTerm);
      } 
      else {
        console.error('Unable to determine city.');
      }
    } 
  }

  private filterPartners(searchTerm: string): void {
    // Logika filtrowania partnerów bez miasta
    if (searchTerm.trim() !== '') {
      this.partners = this.partners.filter(partner => {
        return partner?.name?.toLowerCase().includes(searchTerm.toLowerCase());
      });
    } else {
      this.partners = this.partnerService.getPartnersData();
    }
  }

  selectCategory(categoryName: string): void {

    if (this.categoryActiveName === categoryName) {
      this.categoryActiveName = null;
      this.categoryActive = false;
      this.partners = this.partnerService.getPartnersData();
    } 
    else {
      this.categoryActiveName = categoryName; // Ustaw aktywną kategorię
      this.categoryActive = true;
      this.partners = this.partnerService.getPartnersData().filter(partner => partner.partnerType == categoryName);
    }
  }


  // ------- navbar ---------

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
}