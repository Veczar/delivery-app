import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PartnerReadDto } from 'src/app/shared/model/api-models';
import { PartnerService } from './partner.service';

export interface Restaurant {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  // Add other properties as needed
}


@Component({
  selector: 'app-partner-view',
  templateUrl: './partner-view.component.html',
  styleUrls: ['./partner-view.component.scss']
})

export class PartnerViewComponent {

  restaurants: Restaurant[] = [];
  partners: PartnerReadDto[] = [];

  currentCity!: string | null; 

  constructor(
    private router: Router,
    private partnerService: PartnerService) {}

  ngOnInit(): void {
    const restaurants: Restaurant[] = [
      { id: 1, name: 'Restaurant 1', description: 'Description 1', imageUrl: 'image1.jpg' },
      { id: 2, name: 'Restaurant 2', description: 'Description 2', imageUrl: 'image2.jpg' },
      { id: 3, name: 'Restaurant 2', description: 'Description 2', imageUrl: 'image2.jpg' },
      { id: 4, name: 'Restaurant 2', description: 'Description 2', imageUrl: 'image2.jpg' },
      { id: 5, name: 'Restaurant 2', description: 'Description 2', imageUrl: 'image2.jpg' },
      { id: 6, name: 'Restaurant 2', description: 'Description 2', imageUrl: 'image2.jpg' },
      { id: 7, name: 'Restaurant 2', description: 'Description 2', imageUrl: 'image2.jpg' },
      { id: 8, name: 'Restaurant 2', description: 'Description 2', imageUrl: 'image2.jpg' },
      { id: 9, name: 'Restaurant 2', description: 'Description 2', imageUrl: 'image2.jpg' },
      // Add more restaurants as needed
    ];
    this.restaurants = restaurants;

  

    this.setCity('Kraków');
    const retrievedCity = this.getCity();

    if (retrievedCity) {
      console.log(`Current city: ${retrievedCity}`);
    } else {
      console.log('City not found in localStorage');
    }


    this.getPartners('Kraków');
    console.log('Partners in', '', ':', this.partners);
  }

  //Funkcje do wrzucenia potem do servisu

  setCity(city: string): void {
    this.currentCity = city;
    localStorage.setItem('userCity', city);
  }

  getCity(): string | null {
    if (!this.currentCity) {
      this.currentCity = localStorage.getItem('userCity');
    }
    return this.currentCity;
  }

  getPartners(city: string): void {
    this.partnerService.getPartners(city).subscribe((partners) =>
     { this.partners = partners; console.log('Partners in', city, ':', this.partners); });
    
  }
  


}
