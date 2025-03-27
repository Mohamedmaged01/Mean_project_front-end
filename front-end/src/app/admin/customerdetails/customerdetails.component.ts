import { Component ,OnInit} from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterLink } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customerdetails',
  imports: [SidebarComponent,RouterLink,CommonModule],
  templateUrl: './customerdetails.component.html',
  styleUrl: './customerdetails.component.css'
})
export class CustomerdetailsComponent implements OnInit {

    customer :any ={}
    orders :any ={}
    customerid: any | null = null;
    total:number=0

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService) { }

  ngOnInit(): void {
    this.customerid = this.route.snapshot.paramMap.get('id') || '';

    console.log(this.customerid)
      this.customerService.getCustomerById(this.customerid).subscribe(data => {
        this.customer = data;
        console.log(this.customer)
      });
     
      this.orderService.getUserOrder(this.customerid).subscribe(data => {
        this.orders = data.orders;
        if (Array.isArray(this.orders)) {
          this.total = this.orders.reduce((sum: number, order: any) => sum + (order.totalAmount || 0), 0);
        } else {
          this.total = 0;
        }
      
        console.log(this.total);
        console.log(this.orders);
      });
       
  }

  gotoorderDetails(order:any){
    this.router.navigate(['/orderdetails',order._id])
  }
}
