import { Component  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent  {
  constructor(private router: Router, private route: ActivatedRoute) {}

  navigateToSameComponent(): void {
    this.router.navigate([this.route.snapshot.url]);
  }
}
//https://v16.material.angular.io/components/table/examples
