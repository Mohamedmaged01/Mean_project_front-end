import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { jwtDecode } from 'jwt-decode';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../userservices/cart.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-userorder',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './userorder.component.html',
  styleUrls: ['./userorder.component.css'] 
})
export class UserorderComponent implements OnInit {
  customer: any = {};
  customerid: string | null = null;
  cartItems: any[] = [];
  totalAmount: number = 0;
  promoCode: string = '';
  total: number = 0;
  discount: number = 0;
  selectedPaymentMethod: string = '';



  constructor(private customerService: CustomerService,
     private cartService: CartService,
     private orderService: OrderService){}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        this.customerid = decodedToken.userId || decodedToken.id;
        console.log(this.customerid);

        // Fetch Cart Data
        this.cartService.getCartItems().subscribe(
          (data) => {
            const items = (data[0]?.products || []).filter((item: any) => item.productid !== null);
            this.cartItems = items.map((item: any) => ({
              ...item,
              quantity: item.quantity || 1
            }));
            console.log(this.cartItems);
            this.calculateTotal();
          },
          (error) => {
            console.error('Error fetching cart data', error);
          }
        );

        // Fetch Customer Data
        if (this.customerid) {
          this.customerService.getCustomerById(this.customerid).subscribe(
            (data) => {
              this.customer = data;
              console.log(this.customer);
            },
            (error) => {
              console.error('Error fetching customer data:', error);
            }
          );
        }
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }
  }

  getSubtotal(item: any): number {
    const price = item.productid?.price || 0;
    const quantity = item.quantity || 1;
    return price * quantity;
  }

  applyPromoCode(): void {
    if (!this.promoCode.trim()) {
      alert('Please enter a valid promo code.');
      return;
    }

    this.cartService.applyPromoCode(this.customerid, this.promoCode).subscribe(
      (response: any) => {
        this.discount = response.discountValue || 0;
        console.log(this.discount);
        
        this.calculateTotal();
        alert(`Promo code applied! Discount: $${this.discount}`);
      },
      (error) => {
        console.error('Error applying promo code:', error);
        alert('Invalid or expired promo code.');
      }
    );
  }

  calculateTotal(): void {
    this.total = this.cartItems.reduce((sum, item) => sum + this.getSubtotal(item), 0) - this.discount;
  }

  placeOrder(): void {
    if (!this.selectedPaymentMethod) {
      alert("Please select a payment method.");
      return;
    }
  
    const orderdata = {
      shippingAddress: this.customer.address,
      paymentMethod: this.selectedPaymentMethod,
    };
  
    console.log("Order Data:", orderdata); 
  
    this.orderService.placeOrder(orderdata).subscribe(
      (response) => {
        alert("Order placed successfully!");
        console.log("Order response:", response);
      },
      (error) => {
        console.error("Error placing order:", error);
      }
    );
  }
  
}
