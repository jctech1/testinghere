import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-section-b',
  templateUrl: './section-b.component.html',
  styleUrls: ['./section-b.component.scss']
})
export class SectionBComponent {
  newProduct: Product = {
    productId: '',
    productName: '',
    url: '',
    price: 0,
    weight: 0,
    weightUnit: 'kg',
    quantity: 1
  };

  constructor(public cartService: CartService) {} // Use CartService instead of ProductService

  addProduct() {
    this.cartService.addToCart(this.newProduct);
    this.newProduct = {
      productId: '',
      productName: '',
      url: '',
      price: 0,
      weight: 0,
      weightUnit: 'kg',
      quantity: 1
    };
  }

  updateQuantity(index: number, newQuantity: number) {
    this.cartService.updateQuantity(index, newQuantity); // Update quantity using CartService
  }
}
