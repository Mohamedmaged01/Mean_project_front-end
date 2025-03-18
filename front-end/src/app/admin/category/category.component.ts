import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { RouterLink } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-category',
  standalone: true,
  imports: [RouterLink, SidebarComponent, CommonModule, FormsModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'] // ✅ Fixed: styleUrls instead of styleUrl
})
export class CategoryComponent implements OnInit {
  categories: any[] = [];
  isLoading = false;
  errorMessage: string | null = null;
  
  constructor(private categoryService: CategoryService,private router: Router) {}
  
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    console.log('Stored Token:', token);
    this.loadCategories();
  }
  refreshCategories(): void {
    this.loadCategories();
  }
  loadCategories(): void {
    this.isLoading = true;
    this.errorMessage = null; // Reset error message
  
    this.categoryService.getCategories().subscribe({
      next: (response) => {
        console.log('API Response:', response);
        this.categories = response.categories || response; // Handle both formats
        this.isLoading = false;
        console.log(this.categories)
      },
      error: (error) => {
        console.error('API Error:', error);
        if (error.status === 401) {
          this.errorMessage = 'Authentication failed. Please login again.';
          // You might want to redirect to login page here
        } else {
          this.errorMessage = error.error?.message || 'Failed to load categories';
        }
        this.isLoading = false;
      }
    });
  }

  goToDetails(category:any){
    this.router.navigate(['/categorydetails', category._id], { queryParams: { view: 'view' } });
  }

  goToEdit(category:any){
    this.router.navigate(['/categorydetails', category._id], { queryParams: { view: 'edit' } });
  }

  deleteCategory(id:any){
    this.categoryService.deleteCategory(id).subscribe({
      next: (response) => {
        console.log('API Response:', response);
        this.loadCategories();
        },
        error: (error) => {
          console.error('API Error:', error);
          this.errorMessage = error.error?.message || 'Failed to delete category';
          }
          });
  }
  
}
