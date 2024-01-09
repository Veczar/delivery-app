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
  currentCity: string = '';

  constructor(
    private route: ActivatedRoute,
    private partnerService: PartnerService
  ) {}

  ngOnInit(): void {
    // Use paramMap instead of params
    this.route.params.subscribe(params => {
      this.cityName = params['city'];
      console.log(this.cityName);
      this.partnerService.updateCity(this.cityName);
      // this.partners = this.partnerService.getPartnersData();
      this.partnerService.updateCurrentCity(this.cityName);

      this.filteredPartnersSubscription = this.partnerService.filteredPartnersData$.subscribe(partners => {
        this.filteredPartners = partners;
        this.partners = this.filteredPartners;
        this.partners = this.partners.filter(partner => partner.address?.city == this.cityName);
      });

      if (this.partners.length === 0) {
        // Wywołaj metodę getPartners tylko jeżeli partners są puste
        this.getPartners();
      } else {
        this.partners = this.partnerService.getPartnersData();
        this.partners = this.partners.filter(partner => partner.address?.city === this.cityName);
      }

      // if(this.partners!){
      //   this.getPartners();
      // }else{
      //   this.partners = this.partnerService.getPartnersData();
      //   this.partners = this.partners.filter(partner => partner.address?.city == this.cityName);
      // }
    });
  }
    ngOnDestroy(): void {
      if (this.filteredPartnersSubscription) {
        this.filteredPartnersSubscription.unsubscribe();
      }
    }
  getPartners(): void {
    this.partnerService.getPartners().subscribe((partners) => {
      this.partners = partners;
      this.partners = this.partners.filter(partner => partner.address?.city == this.cityName);
    });
  }
}