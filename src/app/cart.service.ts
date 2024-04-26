import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart = new BehaviorSubject<Product[]>([]);

  getCartItems() {
    return this.cart.asObservable();
  }

  addToCart(product: Product) {
    const currentValue = this.cart.value;
    const updatedValue = [...currentValue, product];
    this.cart.next(updatedValue);
  }
  
}
