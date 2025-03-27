import { Component , OnInit} from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orderdetails',
  imports: [SidebarComponent,RouterLink,CommonModule],
  templateUrl: './orderdetails.component.html',
  styleUrl: './orderdetails.component.css'
})
export class OrderdetailsComponent  implements OnInit {

  order: any = {};
  orderid: any | null = null;
  isViewMode: boolean = false;

  constructor(private orderService: OrderService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.orderid =(this.route.snapshot.paramMap.get('id'));
    console.log(this.orderid)

    if(this.orderid){
      this.orderService.getOrderById(this.orderid).subscribe({
        next: (data) => {
          this.order = data.order;
          console.log(this.order);
        },
        error: (error) => {
          console.error('Error fetching order details:', error);
        }
      });
        }
  }

}
