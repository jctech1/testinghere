// section-d.component.ts
import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import { InvoiceService } from '../services/invoice.service';
import { WishlistService } from '../services/wishlist.service'; // Import WishlistService
import { UserService } from '../services/user.service'; // Import UserService

@Component({
  selector: 'app-section-d',
  templateUrl: './section-d.component.html',
  styleUrls: ['./section-d.component.scss']
})
export class SectionDComponent {
  orderMade = false;

  constructor(
    public cartService: CartService,
    private invoiceService: InvoiceService,
    private wishlistService: WishlistService, // Inject WishlistService
    private userService: UserService, // Inject UserService
    private router: Router) {}

  calculateWeightPrice(): number {
    return this.invoiceService.calculateInvoiceWeightPrice(this.cartService.calculateTotalWeight());
  }

  calculateTotalPrice(): number {
    const subtotal = this.cartService.calculateSubtotal();
    const weightPrice = this.calculateWeightPrice();
    const customsGuidePrice = 15;
    return this.invoiceService.calculateInvoiceTotalPrice(subtotal, weightPrice, customsGuidePrice);
  }

  addToCartAndNavigate(): void {
    this.invoiceService.setTotalCost(this.calculateTotalPrice());
    this.router.navigate(['/carrito']);
  }

  addToWishlistAndNavigate(): void {
    this.userService.getCurrentUser().subscribe(user => {
        const userId = user.uid; // Assuming 'uid' is the unique identifier for the user
        this.router.navigate(['/wishlist']);
    });
  }
}
