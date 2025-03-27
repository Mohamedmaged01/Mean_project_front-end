// user-info-for-admin.component.ts
import { Component, OnInit } from '@angular/core';
import { UserinfoService } from '../../../userservices/userinfo.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-info-for-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-info-for-admin.component.html',
  styleUrls: ['./user-info-for-admin.component.css']
})
export class UserInfoForAdminComponent implements OnInit {
  users: any[] = [];
  selectedUser: any = null;
  orders: any[] = [];
  loading = true;
  error: string | null = null;
  editingUser: any = null;
  statusOptions: string[] = ['accepted', 'rejected']; 

  constructor(private userinfoService: UserinfoService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.userinfoService.getAllUsers().subscribe({
      next: (response) => {
        this.users = response || [];
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      }
    });
  }

  showUserOrders(user: any) {
    this.selectedUser = user;
    this.userinfoService.getUserOrders(user._id).subscribe({
      next: (response) => {
        this.orders = response?.orders || [];
      },
      error: (err) => {
        this.error = err.message;
      }
    });
  }

  getTotalOrders(orders: any[]): number {
    return orders.reduce((total, order) => total + (order.totalAmount || 0), 0);
  }

  editUser(user: any) {
    this.editingUser = { ...user };
  }

  cancelEdit() {
    this.editingUser = null;
  }

  saveUser() {
    if (this.editingUser) {
      const updatedData = {
        name: this.editingUser.name,
        email: this.editingUser.email
      };
      this.userinfoService.updateUser(this.editingUser._id, updatedData).subscribe({
        next: (response) => {
          const index = this.users.findIndex(u => u._id === this.editingUser._id);
          if (index !== -1) {
            this.users[index] = { ...response };
          }
          if (this.selectedUser?._id === this.editingUser._id) {
            this.selectedUser = { ...response };
          }
          this.editingUser = null;
          this.error = null;
        },
        error: (err) => {
          this.error = err.message;
        }
      });
    }
  }


  updateUserStatus(user: any, newStatus: string) {
    this.userinfoService.updateUserStatus(user._id, newStatus).subscribe({
      next: (response) => {
        const index = this.users.findIndex(u => u._id === user._id);
        if (index !== -1) {
          this.users[index] = { ...response };
        }
        if (this.selectedUser?._id === user._id) {
          this.selectedUser = { ...response };
        }
        this.error = null;
      },
      error: (err) => {
        this.error = err.message;
      }
    });
  }
}