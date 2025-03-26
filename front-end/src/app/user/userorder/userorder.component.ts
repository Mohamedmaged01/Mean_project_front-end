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
  total: number = 0;
  promoCode: string = '';
  discount: number = 0;
  selectedPaymentMethod: string = '';
  paymentStatus: string = '';

  constructor(private customerService: CustomerService,
              private cartService: CartService,
              private orderService: OrderService,
            private router: Router,
            private route: ActivatedRoute
          ) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        this.customerid = decodedToken.userId || decodedToken.id;
        if (this.customerid) {
          this.route.queryParams.subscribe(params => {
            const sessionId = params['session_id'];
          });
          this.loadCartItems();
          this.loadCustomerDetails();
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

  loadCustomerDetails(): void {
    if (!this.customerid) return;
    this.customerService.getCustomerById(this.customerid).subscribe(
      (data) => this.customer = data,
      (error) => console.error('Error fetching customer data:', error)
    );
  }

  getSubtotal(item: any): number {
    return (item[0].productid.price) * (item[0].quantity || 1);
  }

  applyPromoCode(): void {
    if (!this.promoCode.trim()) {
      alert('Please enter a valid promo code.');
      return;
    }

    this.cartService.applyPromoCode(this.customerid, this.promoCode).subscribe(
      (response: any) => {
        this.discount = response.discountValue || 0;
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
    this.total = this.cartItems.reduce((sum, item) => {
      return sum + (item.productid.price * item.quantity);
    }, 0) - this.discount;
  }

  placeOrder(): void {
    if (!this.selectedPaymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    if(this.selectedPaymentMethod == 'cach'){
      this.paymentStatus= 'paid';
    }
    else{
      this.router.navigate(['/payment'], {
        queryParams: {
          amount: this.total,
          customerId: this.customerid
        }
      });
      this.paymentStatus= 'pending';
      
    }
    const orderdata = {
      customerId: this.customerid,
      shippingAddress: this.customer.address,
      paymentMethod: this.selectedPaymentMethod,
      paymentStatus: this.paymentStatus,
      products: this.cartItems.map(item => ({
        productid: item.productid._id,
        quantity: item.quantity
      })),
      totalAmount: this.total
    };

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
