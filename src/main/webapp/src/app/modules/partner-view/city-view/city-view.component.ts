import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PartnerReadDto } from 'src/app/shared/model/api-models';
import { PartnerService } from '../partner.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-city-view',
  templateUrl: './city-view.component.html',
  styleUrls: ['./city-view.component.scss']
})
export class CityViewComponent implements OnInit {
  partners: PartnerReadDto[] = [];
  cityName: string = '';
  currentCity: string = '';

  constructor(
    private route: ActivatedRoute,
    private partnerService: PartnerService
  ) {}

  ngOnInit(): void {
    // Use paramMap instead of params
    this.route.paramMap.subscribe(params => {
      this.cityName = params.get('city') || '';

      this.partnerService.updateCity(this.cityName);
      this.getPartners(this.cityName);
      this.setCity(this.cityName);
    });

    
    

    // if (retrievedCity) {
    //   console.log(`Current city: ${retrievedCity}`);
    // } else {
    //   console.log('City not found in localStorage');
    // }

    // this.getPartners(retrievedCity);
  }

  setCity(city: string): void {
    this.currentCity = city;
    localStorage.setItem('userCity', city);
  }

  getCity(): string {
    return this.currentCity;
  }

  getPartners(city: string): void {
    this.partnerService.getPartners(city).subscribe((partners) => {
      this.partners = partners;
      console.log('Partners in', city, ':', this.partners);
    });
  }
}