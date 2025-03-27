import { Component , Inject, OnInit} from '@angular/core';
import {SidebarComponent} from '../sidebar/sidebar.component';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-addcategory',
  standalone: true,
  imports: [SidebarComponent,RouterLink,FormsModule,CommonModule,ReactiveFormsModule, RouterModule],
  templateUrl: './addcategory.component.html',
  styleUrl: './addcategory.component.css'
})
export class AddcategoryComponent implements OnInit {

  category = {
    name: '',
    description: '',
    image: '',
  };

  constructor(@Inject(CategoryService) private categoryService: CategoryService) {}
  ngOnInit(): void {}

  onImageUpload(event: any): void {
    console.log('📷 Image Upload Event:', event);
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        console.log('📸 Image converted to base64');
        this.category.image = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
  addCategory(): void {
    console.log('🚀 Submitting Category:', this.category);


    this.categoryService.addCategory(this.category).subscribe({
      next: (response) => {
        console.log('API Response:', response);
        },
        error: (error) => {
          console.error('API Error:', error);
          }
    });
  }
}
