import { Component  } from '@angular/core';


export interface Restaurant {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  // Add other properties as needed
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent  {

  restaurants: Restaurant[] = [];

  constructor() {}

  ngOnInit(): void {
    const restaurants: Restaurant[] = [
      { id: 1, name: 'Restaurant', description: 'Description 1', imageUrl: 'image1.jpg' },
      { id: 2, name: 'Restaurant', description: 'Description 2', imageUrl: 'image2.jpg' },
      { id: 3, name: 'Restaurant', description: 'Description 2', imageUrl: 'image2.jpg' },
      { id: 4, name: 'Restaurant', description: 'Description 2', imageUrl: 'image2.jpg' },
      { id: 5, name: 'Restaurant', description: 'Description 2', imageUrl: 'image2.jpg' },
      { id: 6, name: 'Restaurant', description: 'Description 2', imageUrl: 'image2.jpg' },
      { id: 7, name: 'Restaurant', description: 'Description 2', imageUrl: 'image2.jpg' },
      { id: 8, name: 'Restaurant', description: 'Description 2', imageUrl: 'image2.jpg' },
      { id: 9, name: 'Restaurant', description: 'Description 2', imageUrl: 'image2.jpg' },
      // Add more restaurants as needed
    ];
    this.restaurants = restaurants;
  }
}
