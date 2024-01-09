import { Component, Input, OnInit } from '@angular/core';
import { ProductDto } from 'src/app/shared/model/api-models';
import { ProductsService } from '../products.service';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';


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

  @Input()
  modal!: any; //for the exit event when adding to cart

  constructor(
    private productService: ProductsService,
    private shoppingCartService: ShoppingCartService
  ) {}

  ngOnInit(): void {
    this.productService.getProduct(this.productId).subscribe(product => {
      this.product = product;
      this.subtotal = product.price;
    })
  }

  addToCart(): void {
    this.shoppingCartService.addProduct(this.product, this.quantity, this.subtotal);
  }

  decQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
      this.updateSubtotal();
    }
  }

  incQuantity(): void {
    this.quantity++;
    this.updateSubtotal();
  }

  updateSubtotal(): void {
    this.subtotal = this.product.price * this.quantity;
  }

  // for partner mode
  // deleteProduct():void {
  //   console.log(this.productId);
  //   // this.productService.deleteProduct(this.productId);
  // }
}
