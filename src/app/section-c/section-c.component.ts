import { Component } from '@angular/core';
import { CartService } from '../services/cart.service'; // Import CartService instead of ProductService

@Component({
  selector: 'app-section-c',
  templateUrl: './section-c.component.html',
  styleUrls: ['./section-c.component.scss']
})
export class SectionCComponent {
  constructor(public cartService: CartService) {} // Inject CartService instead of ProductService

  calculateFillPercentage(): number {
    const subtotal = this.cartService.calculateSubtotal();
    const maxCost = 200;  // Maximum cost the box can hold
    return (subtotal > maxCost) ? 100 : (subtotal / maxCost) * 100;
  }

  excessAmount(): number {
    const subtotal = this.cartService.calculateSubtotal();
    return subtotal > 200 ? subtotal - 200 : 0;
  }
}
