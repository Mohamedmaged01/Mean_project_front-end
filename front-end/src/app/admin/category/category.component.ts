import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { RouterLink } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [RouterLink, SidebarComponent, CommonModule, FormsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
  categories: any[] = [];
  constructor(private categoryService: CategoryService) {}
  
  ngOnInit(): void {
    let index:number=1;
    this.categoryService.getCategories().subscribe(
      (data) => {
        this.categories = data.products;
        console.log('Fetched Categories:', this.categories);
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }
}