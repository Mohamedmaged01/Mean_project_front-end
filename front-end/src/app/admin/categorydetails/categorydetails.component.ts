import { Component, OnInit } from '@angular/core';
import {SidebarComponent} from '../sidebar/sidebar.component';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';
import { CategoryService } from '../../services/category.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categorydetails',
  imports: [SidebarComponent,RouterLink,NgIf,FormsModule],
  templateUrl: './categorydetails.component.html',
  styleUrl: './categorydetails.component.css'
})
export class CategorydetailsComponent implements OnInit {
  category: any = { name: '', description: '' };
  catid: any | null = null;
  isViewMode: boolean = false;

  constructor(private categoryService: CategoryService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.isViewMode = params['view'] === 'view';
    });

    this.catid =(this.route.snapshot.paramMap.get('id'));
    console.log(this.catid)

    if (this.catid) {
      this.categoryService.getCategoryDetails(this.catid).subscribe({
        next: (data) => {
          this.category = data;
        },
        error: (error) => {
          console.error('Error fetching category details:', error);
        }
      });
    }
  }

  
}

