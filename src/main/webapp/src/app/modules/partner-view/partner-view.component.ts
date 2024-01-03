import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PartnerReadDto } from 'src/app/shared/model/api-models';
import { PartnerService } from './partner.service';
import { ActivatedRoute } from '@angular/router';



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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private partnerService: PartnerService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.cityName = params['city'];});


     this.setCity(this.cityName);
      const retrievedCity = this.getCity();

      if (retrievedCity) {
        console.log(`Current city: ${retrievedCity}`);
      } else {
        console.log('City not found in localStorage');
      }


    // this.getPartners(retrievedCity);
    // console.log('Partners in', '', ':', this.partners);
  }

  //Funkcje do wrzucenia potem do servisu

  setCity(city: string): void {
    this.currentCity = city;
    localStorage.setItem('userCity', city);
  }

  getCity(): string {
    return this.currentCity;
  }

  // getPartners(city: string): void {
  //   this.partnerService.getPartners(city).subscribe((partners) =>
  //    { this.partners = partners; console.log('Partners in', city, ':', this.partners); });

  // }

  search(searchTerm: string): void {
    const city = this.getCity();
    this.citySearch = searchTerm;
    console.log('searchTerm:', searchTerm);
    if (city === '' || city === null ){
        console.error('Unable to determine city.');
    } else if (city !== null) {
      this.setCity(city);
      this.partnerService.updateSearchTerm(this.citySearch);
      this.router.navigate(['/partners/search/', 'Laskowa', this.citySearch]);
      this.searchActivated = true;
    }
  }



}
