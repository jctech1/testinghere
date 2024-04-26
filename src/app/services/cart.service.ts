import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<Product[]>([]);
  
  getCartItems() {
    return this.cartItems.asObservable();
  }

  addToCart(product: Product) {
    const currentItems = this.cartItems.getValue();
    currentItems.push(product);
    this.cartItems.next(currentItems);
    console.log('Current items in cart:', currentItems);
  }

  removeProduct(index: number) {
    const currentItems = this.cartItems.getValue();
    currentItems.splice(index, 1);
    this.cartItems.next(currentItems);
  }

  calculateTotalCost(): number {
    let total = 0;
    const currentItems = this.cartItems.getValue();
    for (const product of currentItems) {
      total += product.price * (product.quantity ?? 1);
    }
    return total;
  }

  calculateTotalWeight(): number {
    let total = 0;
    const currentItems = this.cartItems.getValue();
    for (const product of currentItems) {
      total += this.convertToKg(product.weight, product.weightUnit || 'defaultUnit') * (product.quantity ?? 1);
    }
    return total;
  }

  calculateSubtotal(): number {
    let subtotal = 0;
    const currentItems = this.cartItems.getValue();
    for (let product of currentItems) {
      subtotal += this.calculateProductSubtotal(product);
    }
    return subtotal;
  }

  // New method to calculate the subtotal for a single product
  calculateProductSubtotal(product: Product): number {
    let subtotal = product.price * (product.quantity ?? 1);
    subtotal += subtotal * 0.07;  // add 7% tax
    return subtotal;
  }

  updateQuantity(index: number, newQuantity: number) {
    const currentItems = this.cartItems.getValue();
    if (currentItems[index]) {
      currentItems[index].quantity = newQuantity;
    }
    this.cartItems.next(currentItems);
  }

  convertToKg(weight: number, unit: string): number {
    switch(unit) {
      case 'kg':
        return weight;
      case 'libras':
        return weight * 0.453592;  // Convert lbs to kg
      case 'onzas':
        return weight * 0.0283495;  // Convert oz to kg
      default:
        return weight;
    }
  }

  clearCart(): void {
    this.cartItems.next([]);
  }
}
