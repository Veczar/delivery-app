import { Injectable } from '@angular/core';
import { ProductDto } from 'src/app/shared/model/api-models';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  products: {product: ProductDto, quantity: number, subtotal: number }[] = [];

  constructor() { }

  addProduct(product: ProductDto, quantity: number, subtotal: number): void {
    this.products.push({product, quantity, subtotal });
  }

  removeProduct(index: number): void {
    if (index !== -1) {
      this.products.splice(index, 1);
    }
  }

  getItems(): { quantity: number, product: ProductDto, subtotal: number }[] {
    return this.products;
  }

  getQuantity(): number {
    return this.products.reduce((sum, item) => sum + item.quantity, 0);
  }

  getTotalPrice(): number{
    return this.products.reduce((sum, item) => sum + item.subtotal, 0);
  }

  clear(): void {
    this.products = [];
  }

}
