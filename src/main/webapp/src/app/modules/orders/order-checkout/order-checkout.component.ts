import { Component } from '@angular/core';
import { ShoppingCartService } from '../../products/shopping-cart/shopping-cart.service';
import { ProductDto, ProductReadDto } from 'src/app/shared/model/api-models';


@Component({
  selector: 'app-order-checkout',
  templateUrl: './order-checkout.component.html',
  styleUrls: ['./order-checkout.component.scss']
})
export class OrderCheckoutComponent {

  products: {product: ProductDto, quantity: number, subtotal: number }[] = [];

  constructor(private shoppingCartService: ShoppingCartService) {
    this.products = shoppingCartService.getItems();
  }

  getTotal(): number {
    return this.shoppingCartService.getTotalPrice();
  }

  getQty() {
    return this.shoppingCartService.getQuantity()
  }

}
