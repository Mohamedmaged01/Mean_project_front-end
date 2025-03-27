import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterLink } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  imports: [SidebarComponent, CommonModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css',
})
export class CustomerComponent implements OnInit {
  customers: any[] = [];
  isLoading = false;
  errorMessage: string | null = null;

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    console.log('Stored Token:', token);
    this.loadCustomers();
  }
  loadCustomers(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.customerService.getCustomers().subscribe({
      next: (response) => {
        console.log('API Response:', response);
        this.customers = response.customers || response;
        this.isLoading = false;
        console.log(this.customers);
      },
      error: (error) => {
        console.error('API Error:', error);
        if (error.status === 401) {
          this.errorMessage = 'Authentication failed. Please login again.';
        } else {
          this.errorMessage =
            error.error?.message || 'Failed to load customers';
        }
        this.isLoading = false;
      },
    });
  }

  deleteCustomers(id: any) {
    this.customerService.deleteCustomer(id).subscribe({
      next: (response) => {
        console.log('API Response:', response);
        this.loadCustomers();
      },
      error: (error) => {
        console.error('API Error:', error);
        if (error.status === 401) {
          this.errorMessage = 'Authentication failed. Please login again.';
        } else {
          this.errorMessage =
            error.error?.message || 'Failed to delete customer';
        }
        this.isLoading = false;
      },
    });
  }

  goToUpdateCustomer(customer: any) {
    this.router.navigate(['/updatecustomer', customer._id]);
  }

  goToCustomerDetails(customer: any) {
    this.router.navigate(['/customerdetails', customer._id]);
  }
}
