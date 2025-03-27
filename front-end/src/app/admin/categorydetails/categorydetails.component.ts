import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterLink } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { CategoryService } from '../../services/category.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categorydetails',
  imports: [SidebarComponent, RouterLink, NgIf, FormsModule],
  templateUrl: './categorydetails.component.html',
  styleUrl: './categorydetails.component.css'
})
export class CategorydetailsComponent implements OnInit {
  category: any = { name: '', description: '' };
  catid: any | null = null;
  isViewMode: boolean = false;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.isViewMode = params['view'] === 'view';
    });

    this.catid = this.route.snapshot.paramMap.get('id') || '';

    if (!this.catid) {
      console.error('❌ No category ID found in URL.');
      return;
    }

    console.log('🆔 Category ID:', this.catid);

    this.categoryService.getCategoryDetails(this.catid).subscribe({
      next: (data) => {
        if (!data) {
          console.warn('⚠️ No data returned for this category.');
        } else {
          this.category = data;
        }
      },
      error: (error) => {
        console.error('❌ Error fetching category details:', error);
      }
    });
  }

  updateCategory() {
    if (this.isViewMode) {
      console.warn('⚠️ View mode enabled. Update not allowed.');
      return;
    }

    if (!this.catid) {
      console.error('❌ Category ID is missing.');
      return;
    }

    console.log('📤 Updating Category:', this.catid, this.category);

    this.categoryService.updateCategoryDetails(this.catid, this.category).subscribe({
      next: (data) => {
        console.log('✅ Category updated successfully:', data);
        alert('Category updated successfully.');
        this.router.navigate(['/category']);
      },
      error: (error) => {
        console.error('❌ Error updating category:', error);
      }
    });
  }
}
