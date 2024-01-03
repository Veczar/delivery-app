import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PartnerReadDto } from 'src/app/shared/model/api-models';
import { PartnerService } from '../partner.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-view',
  templateUrl: './search-view.component.html',
  styleUrls: ['./search-view.component.scss']
})
export class SearchViewComponent {
  currentCity: string = '';
  searchTerm: string = '';
  searchPartners: PartnerReadDto[] = [];
  searchActivated: boolean = false;
  citySearch: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private partnerService: PartnerService) {}


    ngOnInit(): void {
      // Retrieve city and searchTerm from route parameters
      this.route.params.subscribe(params => {
        this.citySearch = params['city'];
      });

      this.setCity(this.citySearch);  
      const retrievedCity = this.getCity();

      if (retrievedCity) {
        console.log(`Current city: ${retrievedCity}`);
      } else {
        console.log('City not found in localStorage');
      }

      // Call the search function with the retrieved parameters
      
      console.log('City:',retrievedCity);
      this.partnerService.searchTerm$.subscribe((searchTerm) => {
        this.searchTerm = searchTerm;
        this.getPartners(retrievedCity);
      });


    
    }

    getPartners(city: string): void {
      // Use this.searchTerm in the request to consider the updated search term
      this.partnerService.getPartnersSearch(city, this.searchTerm).subscribe((searchPartners) => {
        this.searchPartners = searchPartners;
        console.log('Partners in', city, ':', this.searchPartners);
      });
    }

    setCity(city: string): void {
    this.currentCity = city;
    localStorage.setItem('userCity', city);
  }

  getCity(): string {
    return this.currentCity;
  }

  // search(searchTerm: string, city: string): void {
    
  //     this.partnerService.getPartnersSearch(city, searchTerm).subscribe((searchPartners) => {
  //         this.searchPartners = searchPartners;
  //         console.log('Partners in', city, ':', this.searchPartners);
  //     });
  //     this.searchActivated = true;
  }



