import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { jwtDecode } from 'jwt-decode';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../userservices/cart.service';
import { OrderService } from '../../services/order.service';
import { Router , ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, CommonModule,FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  customerid: string | null = null;
  cartItems: any[] = [];
  total: number = 0;
  subtotal : number = 0;
  couponCode = '';
  discount = 0;

  constructor( private cartService : CartService) { }
    ngOnInit(): void {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decodedToken: any = jwtDecode(token);
          this.customerid = decodedToken.userId || decodedToken.id;
          if (this.customerid) {
            this.loadCartItems();
            this.calculateTotal();
          }
        } catch (error) {
          console.error('Invalid token:', error);
        }
      }
    }

    loadCartItems(): void {
      this.cartService.getCartItems().subscribe(
        (data) => {
          this.cartItems = (data[0].products || [])
            .filter((item: any) => item.productid !== null)
            .map((item: any) => ({
              ...item,
              quantity: item.quantity || 1
            }));
          console.log(this.cartItems);
          
          this.calculateTotal();
        },
        (error) => console.error('Error fetching cart data', error)
      );
    }


    getSubtotal(item: any) {
      return item.productid.price * item.quantity;
    }
    
    applyCoupon() {    
      this.cartService.checkCoupon(this.couponCode).subscribe({
        next: (res) => {
          if (res.success) {
            this.discount = res.discount;
            alert(`🎉 Coupon applied! You got ${this.discount}% off`);
            this.calculateTotal();
          }
        },
        error: (err) => {
          alert(err.error.message || 'Invalid coupon');
        }
      });
    }
    calculateTotal() {
      this.subtotal = this.cartItems.reduce((acc, item) => acc + this.getSubtotal(item), 0);
      this.total = this.subtotal; // Apply discount logic here if coupon is valid
    }
    updateQuantity(item: any, event: Event) {
      const input = event.target as HTMLInputElement;
      const newQuantity = parseInt(input.value, 10);
    
      if (newQuantity < 1) {
        input.value = item.quantity; // Reset to old value
        return;
      }
    
      this.cartService.getStock(item.productid._id).subscribe({
        next: (data) => {
          if (data.stock < newQuantity) {
            alert('❗ Not enough stock available');
            input.value = item.quantity;
            return;
          }
    
          
          this.cartService.updateCartQuantity(item.productid._id, newQuantity).subscribe({
            next: (response) => {
              console.log('✅ Quantity updated:', response);
              item.quantity = newQuantity; 
              this.loadCartItems(); 
            },
            error: (error) => {
              console.error('❌ Failed to update quantity:', error);
            }
          });
        },
        error: (error) => {
          console.error('❌ Failed to get stock:', error);
        }
      });
    }
    
    
    removeItem(item: any) {

      this.cartService.removeFromCart(item.productid._id).subscribe({
        next: (response) => {
          console.log('✅ Product deleted successfully:', response);
          console.log(item.productid._id);
          
          this.loadCartItems();
        },
        error: (error) => {
          console.error('❌ Error deleting product:', error);
        }
      });
    }
    

    updateCart() {
      alert('Cart updated!');
    }
    
    // applyCoupon() {
    //   if (this.couponCode === 'abcd') {
    //     this.total = this.subtotal * 0.9;
    //     alert('Coupon applied: 10% off!');
    //   } else {
    //     alert('Invalid coupon!');
    //   }
    // }
}
