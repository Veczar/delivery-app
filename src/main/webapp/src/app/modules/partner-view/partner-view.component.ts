import { Component, OnInit,OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { PartnerService } from './partner.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { filter } from 'rxjs';
import { PartnerReadDto } from 'src/app/shared/model/api-models';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-partner-view',
  templateUrl: './partner-view.component.html',
  styleUrls: ['./partner-view.component.scss']
})

export class PartnerViewComponent {

  partners: PartnerReadDto[] = [];
  searchTerm: string = '';
  searchActivated: boolean = false;
  citySearch: string = '';
  cityName: string = '';
  currentCity: string = '';
  newAddress: string = '';
  flag: boolean = false;
  private citySubscription: Subscription | undefined;
  categoryActive: boolean = false;
  categoryActiveName: string | null = null;

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

    // this.cityName = this.partnerService.getCity();
    this.citySubscription = this.partnerService.currentCity.subscribe(city => {
      this.cityName = city || ''; // Dodaj obsługę przypadku, gdy wartość może być null lub undefined
      console.log(this.cityName);
      this.getPartners();
    });
    // this.getPartners();

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
  ngOnDestroy(): void {
    if (this.citySubscription) {
      this.citySubscription.unsubscribe();
    }
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
    this.cityName = (this.newAddress);
    this.partnerService.updateCity(this.newAddress);
    console.log('New Address:', this.newAddress);

    this.router.navigate(['/partners/', this.newAddress]);

    // Zamknij modal po zapisie
    this.modalService.dismissAll();
  }

  goToAllPartners(): void {
    this.router.navigate(['/partners']);
    this.partnerService.updateCity('');
    this.partnerService.updateCurrentCity('');
    this.getPartners();
  }

  setCity(city: string): void {
    this.currentCity = city;
    localStorage.setItem('userCity', city);
  }

  getCity(): string {
    return this.currentCity;
  }


  search(searchTerm: string): void {
    
    this.citySearch = searchTerm;

    if (this.cityName === '' || this.cityName === null) {

      if (this.flag) {
        this.filterPartners(this.citySearch);
      } else {
        console.error('Unable to determine city.');
      }

    } else if (this.citySearch === '' || this.citySearch === null) {
      this.partnerService.updateSearchTerm(this.citySearch);
      this.router.navigate(['/partners/', this.cityName]);
    } else if (this.cityName !== null) {

      this.partnerService.updateSearchTerm(this.citySearch);
      this.router.navigate(['/partners/search/', this.cityName, this.citySearch]);
      this.searchActivated = true;
    }
  }

  getPartners(): void {
    this.partnerService.getPartners().subscribe((partners) => {
      this.partners = partners;
      console.log(this.partners);
      // Zapisz dane partners w serwisie
      this.partnerService.setPartnersData(this.partners);
    });
  }

  private updatePartnersData(): void {
    this.partnerService.getPartners().subscribe((partners) => {
      this.partners = partners;

      // Zapisz dane w serwisie, aby były dostępne dla innych komponentów
      this.partnerService.setPartnersData(this.partners);
    });

  }
  private filterPartners(searchTerm: string): void {
    // Logika filtrowania partnerów bez miasta
    if (searchTerm && searchTerm.trim() !== '') {
      this.partners = this.partners.filter(partner => {
        return partner?.name?.toLowerCase().includes(searchTerm.toLowerCase());
      });
      this.partnerService.setPartnersData(this.partners);
    } else {
      // Brak terminu wyszukiwania, można przywrócić pełną listę partnerów
      this.updatePartnersData();
    }
  }
  selectCategory(categoryName: string): void {
    const partnersBefore = this.partnerService.getPartnersData();

    if (this.categoryActiveName === categoryName) {
      this.categoryActiveName = null;
      this.categoryActive = false;
      this.partnerService.setFilteredPartnersData(partnersBefore);
      this.partners = partnersBefore;
      
       
    } else {
      this.categoryActiveName = categoryName; // Ustaw aktywną kategorię
      this.categoryActive = true;
      
      // this.partners = partnersBefore.filter(partner => partner.partnerType == this.categoryActiveName);
      const filteredPartners = partnersBefore.filter(partner => partner.partnerType == this.categoryActiveName);
      this.partnerService.setFilteredPartnersData(filteredPartners);
      this.partners = filteredPartners;
      console.log(this.partners);
    }
    console.log(this.categoryActiveName);
    console.log(this.categoryActive);
  }
}