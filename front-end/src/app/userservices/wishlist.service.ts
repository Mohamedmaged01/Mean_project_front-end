import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../../interfaces/Product_model'
@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlistItems: Product[] = [];
  private wishlistItemsSubject = new BehaviorSubject<Product[]>([]);

  wishlistItems$ = this.wishlistItemsSubject.asObservable();


  getWishlist(): Product[] {
    return this.wishlistItems;
  }


  addToWishlist(product: Product) {
    const existingItem = this.wishlistItems.find(item => item._id === product._id);
    if (!existingItem) {

      this.wishlistItems.push({ ...product });
    }
    this.updateWishlist();
  }



  removeFromWishlist(item: Product) {
    this.wishlistItems = this.wishlistItems.filter(cartItem => cartItem._id !== item._id);
    this.updateWishlist();
  }

  private updateWishlist() {
    this.wishlistItemsSubject.next([...this.wishlistItems]);
  }

}
