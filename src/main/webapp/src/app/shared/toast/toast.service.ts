import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
	toasts: any[] = [];

  show( body: string, options: any = {}) {
    this.toasts.push({ body, ...options });
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter(t => t != toast);
  }

  showInfo(text: string) {
    this.show(text);
  }

  showSuccess(text: string) {
    this.show(text, { classname: 'bg-success text-light' });
  }

  showError(text: string) {
    this.show(text, { classname: 'bg-danger text-light' });
  }
}
