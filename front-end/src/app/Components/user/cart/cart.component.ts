import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../userservices/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.loadCartItems(); 
  }

  loadCartItems() {
    this.loading = true;
    this.error = null;
    this.cartService.getCartItems().subscribe({
      next: (response) => {
       
        const items = (response[0]?.products || []).filter((item: any) => item.productid !== null);
        this.cartItems = items.map((item: any) => ({
          ...item,
          quantity: item.quantity || 1 
        }));
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message || 'Failed to load cart items';
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
    return item.quantity >= (item.productid?.stock || 0);
  }

  removeItem(item: any) {
    this.cartService.removeFromCart(item.productid._id).subscribe({
      next: () => {
        
        this.loadCartItems();
      },
      error: (err) => {
        this.error = err.message || 'Failed to remove item from cart';
      }
    });
  }

  getSubtotal(item: any): string {
    const price = item.productid?.price || 0;
    const quantity = item.quantity || 1;
    const subtotal = price * quantity;
    return subtotal.toFixed(2);
  }

  getCartTotal(): string {
    const total = this.cartItems.reduce((sum, item) => {
      const price = item.productid?.price || 0;
      const quantity = item.quantity || 1;
      return sum + price * quantity;
    }, 0);
    return total.toFixed(2);
  }
  returnToShop(){
    this.router.navigate(['/login']);
  }
  proceedToCheckout() {
    console.log('Proceeding to checkout');
  }
}