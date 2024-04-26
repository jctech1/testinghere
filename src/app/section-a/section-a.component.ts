import { Component } from '@angular/core';
import { CartService } from '../services/cart.service'; // Import CartService instead of ProductService
import { Product } from '../models/product.model';
import { v4 as uuidv4 } from 'uuid'; // Import UUID function

@Component({
  selector: 'app-section-a',
  templateUrl: './section-a.component.html',
  styleUrls: ['./section-a.component.scss']
})
export class SectionAComponent {
  product: Product = {
    productId: uuidv4(), // Generate UUID for productId
    productName: '',
    url: '',
    price: 0,
    weight: 0,
    weightUnit: 'kg',
    quantity: 1
  };

  constructor(private cartService: CartService) {} // Inject CartService instead of ProductService

  addProduct() {
    this.cartService.addToCart(this.product); // Use addToCart method from CartService
    this.product = {
      productId: uuidv4(), // Generate UUID for productId
      productName: '',
      url: '',
      price: 0,
      weight: 0,
      weightUnit: 'kg',
      quantity: 1
    };
  }
}
