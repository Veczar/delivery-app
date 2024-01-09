import { Component,OnInit } from '@angular/core';
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
      this.setCity(this.cityName);
      this.getPartners();
    });

    

  }

  setCity(city: string): void {
    this.currentCity = city;
    localStorage.setItem('userCity', city);
  }

  getCity(): string {
    return this.currentCity;
  }

  getPartners(): void {
    this.partnerService.partners$.subscribe((partners) => {
      // Otrzymujesz dane partners z serwisu
      const selectedCity = this.getCity();
     
      this.partners = partners.filter(partner => partner?.address?.city === selectedCity);
      
    });
  }
  
  getPartnersCity(city: string): void {
    this.partnerService.getPartnersCity(city).subscribe((partners) => {
      this.partners = partners;
      
    });
  }
}