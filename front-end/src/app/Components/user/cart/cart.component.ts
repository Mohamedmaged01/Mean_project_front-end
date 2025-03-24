// cart.component.ts
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../userservices/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.loadCartItems();
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items.map(item => ({
        ...item,
        quantity: item.quantity || 1 // Set default quantity to 1
      }));
      this.loading = false;
    });
  }

  loadCartItems() {
    this.cartService.getCartItems().subscribe({
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      }
    });
  }

  increaseQuantity(item: any) {
    if (item.quantity < item.productid.stock) {
      item.quantity++;
    }
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  isIncreaseDisabled(item: any): boolean {
    return item.quantity >= item.productid.stock;
  }

  removeItem(item: any) {
    this.cartService.removeFromCart(item.productid._id).subscribe();
  }

  getSubtotal(item: any): string {
    const subtotal = (item.productid.price || 0) * (item.quantity || 1);
    return subtotal.toFixed(2);
  }

  getCartTotal(): string {
    const total = this.cartItems.reduce((sum, item) => {
      return sum + (item.productid.price || 0) * (item.quantity || 1);
    }, 0);
    return total.toFixed(2);
  }
}