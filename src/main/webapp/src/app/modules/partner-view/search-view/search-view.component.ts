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
        this.citySearch = params['city'],
        this.searchTerm = params['searchTerm'];
      });

      this.setCity(this.citySearch);  
      const retrievedCity = this.getCity();

      this.setSearch(this.searchTerm);
      const retrievedSearch = this.getSearch();
    
      if (retrievedSearch) {
        console.log(`Current search: ${retrievedSearch}`);
      } else {
        console.log(`Current search: not found `);
      }
      

      if (retrievedCity) {
        console.log(`Current city: ${retrievedCity}`);
      } else {
        console.log('City not found in localStorage');
      }

      // Call the search function with the retrieved parameters
      
      this.partnerService.searchTerm$.subscribe((searchTerm) => {
        this.searchTerm = searchTerm;
        localStorage.setItem('searchTerm', searchTerm);

        if(!searchTerm){
          searchTerm = retrievedSearch;
          this.setSearch(searchTerm);
        }
        this.getPartners(retrievedCity,searchTerm);
        
      });

      

      // this.getPartners(retrievedCity,retrievedSearch);

    
    }

    getPartners(city: string, searchTerm: string): void {
      // Use this.searchTerm in the request to consider the updated search term
      this.partnerService.getPartnersSearch(city, searchTerm).subscribe((searchPartners) => {
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
    setSearch(search: string): void {
      this.searchTerm = search;
      localStorage.setItem('searchTerm', search);
    }
    getSearch(): string {
      return this.searchTerm;
    }

  }



