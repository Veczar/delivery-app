import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-partner-view',
  templateUrl: './partner-view.component.html',
  styleUrls: ['./partner-view.component.scss']
})

export class PartnerViewComponent {

  currentCity!: string | null; 

  constructor(private router: Router) {}

  ngOnInit(): void {
    
    this.setCity('Warsaw');
    const retrievedCity = this.getCity();

    if (retrievedCity) {
      console.log(`Current city: ${retrievedCity}`);
    } else {
      console.log('City not found in localStorage');
    }
  }

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

}
