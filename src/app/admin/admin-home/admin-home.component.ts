import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { AllProductsComponent } from '../allproducts/allproducts.component';
import { CategoryComponent } from '../category/category.component';
@Component({
  selector: 'app-admin-home',
  imports: [SidebarComponent, AllProductsComponent],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css',
})
export class AdminHomeComponent {}
