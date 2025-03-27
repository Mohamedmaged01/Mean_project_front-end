import { Component , OnInit} from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterLink } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-updatecustomer',
  imports: [SidebarComponent,RouterLink,CommonModule, FormsModule],
  templateUrl: './updatecustomer.component.html',
  styleUrl: './updatecustomer.component.css'
})
export class UpdatecustomerComponent  implements OnInit {
  customer: any = {};
  customerid: any | null = null;

  constructor(private customerService: CustomerService , private route: ActivatedRoute , private router: Router) { }

  ngOnInit() {
    this.customerid =(this.route.snapshot.paramMap.get('id'));
    console.log(this.customerid)
    this.customerService.getCustomerById(this.customerid).subscribe({
      next: (data) => {
        this.customer = data;
      },
      error: (error) => {
        console.error('Error fetching customer details:', error);
      }
    });
  }

  updateCustomerDetails() {
    this.customerService.updateCustomer(this.customerid, this.customer).subscribe({
      next: (updatedData) => {
        console.log('Customer updated successfully:', updatedData);
        alert("customer updated successfully");
        this.router.navigate(['/customer']);
      },
      error: (error) => {
        console.error('Error updating customer:', error);
      }
    });
  }
  
}
