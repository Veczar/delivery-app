import { Component, Input, OnInit } from '@angular/core';
import { ProductDto } from 'src/app/shared/model/api-models';
import { ProductsService } from '../products.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input()
  productId!: number;

  product!: ProductDto;
  quantity: number = 1;
  subtotal: number = 0;

  constructor(
    private productService: ProductsService
    // todo: shopping cart service
  ) {}

  ngOnInit(): void {
    this.productService.getProduct(this.productId).subscribe(product => {
      this.product = product;
      this.subtotal = product.price;
    })
  }

  addToCart(): void {
    // todo: cart
    console.log('product added, quantity: ', this.quantity);
    console.log('subtotal: ', this.subtotal);
  }

  decQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
      this.updateSubtotal();
    }
  }

  incQuantity() {
    this.quantity++;
    this.updateSubtotal();
  }

  updateSubtotal() {
    this.subtotal = this.product.price * this.quantity;
  }
}
