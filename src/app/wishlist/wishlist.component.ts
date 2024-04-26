import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product-service.service';
import { WishlistService } from '../services/wishlist.service';
import { Router } from '@angular/router';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  wishlistItems: Product[] = [];
  currentUserId = JSON.parse(localStorage.getItem('currentUser') || '{}')?.uid || '';

  constructor(
    public productService: ProductService, 
    public wishlistService: WishlistService,
    private router: Router) {}

  ngOnInit() {
    if (!this.currentUserId) {
      console.error('User not logged in');
      // Optionally, you can redirect to the login page
      // this.router.navigate(['/login']);
      return;
    }
    this.getWishlistItems();
  }

  getWishlistItems(): void {
    this.wishlistService.getUserWishlist(this.currentUserId).subscribe(items => {
      this.wishlistItems = items;
    });
  }

  deleteFromWishlist(index: number): void {
    const productId = this.wishlistItems[index].productId;
    if (productId) {
      this.wishlistService.removeFromWishlist(this.currentUserId, productId).subscribe(() => {
        this.getWishlistItems(); // Refresh the wishlist items after deletion
      });
    } else {
      // Handle the case where productId is undefined
      console.error('productId is undefined');
    }
  }

  moveToProductList(index: number): void {
    const item = this.wishlistItems[index];
    this.productService.addProduct(item);
    this.deleteFromWishlist(index);
  }
}
