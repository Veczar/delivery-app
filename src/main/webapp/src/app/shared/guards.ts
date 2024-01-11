import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { ShoppingCartService } from "../modules/products/shopping-cart/shopping-cart.service";
import { ToastService } from "./toast/toast.service";

export const authGuard = () => {
  const router = inject(Router);

  if (localStorage.getItem('role') === 'ADMIN') {
    return true;
  }
  else {
    router.navigate(['/']);
    return false
  }
}

export const authCurierGuard = () => {
  const router = inject(Router);

  if (localStorage.getItem('role') === 'COURIER') {
    return true;
  }
  else {
    router.navigate(['/']);
    return false
  }
}

export const checkoutGuard = () => {
  const router = inject(Router);
  const shoppingCart = inject(ShoppingCartService);
  const toast = inject(ToastService);

  if (shoppingCart.getCartSize() > 0) {
    return true;
  }
  else {
    toast.showError('add some items to your cart before checkout');
    router.navigate(['.']);
    return false
  }
}
