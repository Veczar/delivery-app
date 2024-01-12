import { Component } from '@angular/core';
import { ProductDto } from 'src/app/shared/model/api-models';
import { ShoppingCartService } from './shopping-cart.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { ToastService } from 'src/app/shared/toast/toast.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent {

  products: {product: ProductDto, quantity: number, subtotal: number }[] = [];

  constructor(
    private shoppingCartService: ShoppingCartService,
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router,
  ) {
    this.products = shoppingCartService.getItems(); 
  }

  getTotalPrice(): number {
    return this.shoppingCartService.getTotalPrice();
  }

  getCartSize(): number {
    return this.shoppingCartService.getCartSize();
  }

  removeItem(index: number): void {
    this.shoppingCartService.removeProduct(index);
  }

  onCheckout(): void {
    if (this.authService.isUserLogged()){
      this.router.navigate(['/checkout']);
    }
    else {
      this.toastService.showError('You need to be logged in!');
    }
  }

  onRecurring(): void {
    if (this.authService.isUserLogged()){
      this.router.navigate(['/checkout/recurring']);
    }
    else {
      this.toastService.showError('You need to be logged in!');
    }
  }
}
