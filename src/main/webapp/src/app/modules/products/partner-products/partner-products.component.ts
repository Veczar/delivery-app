import { Component, OnInit } from '@angular/core';
import { ProductReadDto } from 'src/app/shared/model/api-models';
import { ProductsService } from '../products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-partner-products',
  templateUrl: './partner-products.component.html',
  styleUrls: ['./partner-products.component.scss']
})
export class PartnerProductsComponent implements OnInit {

  products: ProductReadDto[] = [];
  partnerName: string = '';

  constructor(private productService: ProductsService, private route: ActivatedRoute,) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const partnerName = params['partner'];
      console.log('name: ', partnerName);
      this.productService.getProductsFromPartner(partnerName).subscribe(products => {
        this.products = products;
      })
    })
  }

}
