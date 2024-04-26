import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  constructor(private http: HttpClient) { }

  // Returns the wishlist for a given user
  getUserWishlist(userId: string): Observable<Product[]> {
    return this.http.get<Product[]>(`/api/wishlists/${userId}`);
  }

  // Adds a product to the wishlist of a given user
  addToWishlist(userId: string, product: Product) {
    return this.http.post(`/api/wishlists/${userId}`, product); // Send the entire Product object to the backend
  }
  

  // Removes a product from the wishlist of a given user
  removeFromWishlist(userId: string, productId: string): Observable<void> {
    return this.http.delete<void>(`/api/wishlists/${userId}/${productId}`);
  }
}
