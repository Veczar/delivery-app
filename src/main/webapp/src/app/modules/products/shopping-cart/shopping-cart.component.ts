import { Component } from '@angular/core';
import { ProductDto } from 'src/app/shared/model/api-models';
import { ShoppingCartService } from './shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent {

  products: {product: ProductDto, quantity: number, subtotal: number }[] = [];

  constructor(private shoppingCartService: ShoppingCartService) {
    this.products = shoppingCartService.getItems(); 
  }

  getTotalPrice(): number {
    return this.shoppingCartService.getTotalPrice();
  }

  removeItem(index: number) {
    this.shoppingCartService.removeProduct(index);
  }
}
