import { inject } from "@angular/core";
import { Router } from "@angular/router";

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
export const authPartnerGuard = () => {
  const router = inject(Router);

  if (localStorage.getItem('role') === 'PARTNER') {
    return true;
  }
  else {
    router.navigate(['/']);
    return false
  }
}