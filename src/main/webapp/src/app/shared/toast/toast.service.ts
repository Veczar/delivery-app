import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
	toasts: any[] = [];

  show( body: string, options: any = {}) {
    this.toasts.push({ body, ...options });
    // console.log(this.toasts[0].classname);
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter(t => t != toast);
  }
}
