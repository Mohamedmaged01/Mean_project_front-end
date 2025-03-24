import { Component ,OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterLink } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  imports: [SidebarComponent,CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {
  constructor(private orderService: OrderService, private router: Router) { }

  orders: any[] = [];
  isLoading = false;
  errorMessage: string | null = null;

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    console.log('Stored Token:', token);
    this.loadorders();
  }


  loadorders():void{
    this.isLoading = true;
    this.errorMessage = null;

    this.orderService.getOrders().subscribe({
      next:(data)=>{
        this.orders = data.orders || data;
        console.log(this.orders)
        this.isLoading = false;
        },
        error:(error)=>{
          this.isLoading = false;
          this.errorMessage = error.message;
          }
    });
  }

  goToOrderDetails(order :any){
    this.router.navigate(['/orderdetails' , order._id]);
  }
}
