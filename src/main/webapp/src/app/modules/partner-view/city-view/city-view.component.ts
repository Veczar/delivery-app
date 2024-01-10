import { Component,OnInit } from '@angular/core';
import { PartnerReadDto } from 'src/app/shared/model/api-models';
import { PartnerService } from '../partner.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-city-view',
  templateUrl: './city-view.component.html',
  styleUrls: ['./city-view.component.scss']
})
export class CityViewComponent implements OnInit {
  filteredPartners: PartnerReadDto[] = [];
  partners: PartnerReadDto[] = [];
  cityName: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private partnerService: PartnerService
  ) {}

  ngOnInit(): void {
    // Use paramMap instead of params
    this.route.params.subscribe(params => {
      this.cityName = params['city'];
      this.partnerService.updateCurrentCity(this.cityName);


      if (this.cityName == '') {
        this.router.navigate(['/partners']);
      } 
      else {
        this.partnerService.partnersSubject.subscribe(partners => {
          this.partners = partners.filter(partner => partner.address?.city == this.cityName);
        });
      }
    })
  }

  // ngOnDestroy(): void {
  //   if (this.filteredPartnersSubscription) {
  //     this.filteredPartnersSubscription.unsubscribe();
  //   }
  // }
}