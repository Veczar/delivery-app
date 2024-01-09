import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PartnerReadDto } from 'src/app/shared/model/api-models';
import { PartnerService } from '../partner.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-search-view',
  templateUrl: './search-view.component.html',
  styleUrls: ['./search-view.component.scss']
})
export class SearchViewComponent {
  filteredPartners: PartnerReadDto[] = [];
  partners: PartnerReadDto[] = [];
  currentCity: string = '';
  searchTerm: string = '';
  citySearch: string = '';
  private filteredPartnersSubscription: Subscription | undefined;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private partnerService: PartnerService) { }


  ngOnInit(): void {
    // Retrieve city and searchTerm from route parameters
    this.route.params.subscribe(params => {
      this.citySearch = params['city'],
      this.searchTerm = params['searchTerm'];
      // this.getPartners();
      
      this.filteredPartnersSubscription = this.partnerService.filteredPartnersData$.subscribe(partners => {
        this.filteredPartners = partners;
        this.partners = this.filteredPartners;
        this.partners = this.partners.filter(partner =>
          partner?.address?.city === this.citySearch &&
          partner?.name?.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      });

      if (this.partners.length === 0) {
        // Wywołaj metodę getPartners tylko jeżeli partners są puste
        this.getPartners();
      } else {
        this.partners = this.partnerService.getPartnersData();
        this.partners = this.partners.filter(partner =>
          partner?.address?.city === this.citySearch &&
          partner?.name?.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      }

    });


    // if (!searchTerm) {
    //   searchTerm = retrievedSearch;
    //   this.setSearch(searchTerm);
    // }
    
  }
  
  getPartners(): void {
  
    this.partners = this.partnerService.getPartnersData().filter(partner =>
      partner?.address?.city === this.citySearch &&
      partner?.name?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    
  }

  setCity(city: string): void {
    this.currentCity = city;
    localStorage.setItem('userCity', city);
  }

  getCity(): string {
    return this.currentCity;
  }
  setSearch(search: string): void {
    this.searchTerm = search;
    localStorage.setItem('searchTerm', search);
  }
  getSearch(): string {
    return this.searchTerm;
  }

}



