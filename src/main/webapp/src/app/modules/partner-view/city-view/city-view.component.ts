import { Component,OnInit } from '@angular/core';
import { PartnerReadDto } from 'src/app/shared/model/api-models';
import { PartnerService } from '../partner.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-city-view',
  templateUrl: './city-view.component.html',
  styleUrls: ['./city-view.component.scss']
})
export class CityViewComponent implements OnInit {
  filteredPartners: PartnerReadDto[] = [];
  private filteredPartnersSubscription: Subscription | undefined;
  partners: PartnerReadDto[] = [];
  cityName: string = '';

  constructor(
    private route: ActivatedRoute,
    private partnerService: PartnerService
  ) {}

  ngOnInit(): void {
    // Use paramMap instead of params
    this.route.params.subscribe(params => {
      this.cityName = params['city'];
      this.partnerService.updateCurrentCity(this.cityName);


      if (this.cityName == '') {
        console.log('dupa')
        this.partners = this.partnerService.getPartnersData();
      } 
      else {
        this.partnerService.partnersSubject.subscribe(partners => {
          this.partners = partners.filter(partner => partner.address?.city == this.cityName);
        });
      }
    })
  }

  ngOnDestroy(): void {
    if (this.filteredPartnersSubscription) {
      this.filteredPartnersSubscription.unsubscribe();
    }
  }
}