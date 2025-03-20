import { Routes } from '@angular/router';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { CategoryComponent } from './admin/category/category.component';
import { AddcategoryComponent } from './admin/addcategory/addcategory.component';
import { CategorydetailsComponent } from './admin/categorydetails/categorydetails.component';
import { CustomerComponent } from './admin/customer/customer.component';
import { AddProductComponent } from './admin/addproduct/addproduct.component';
import { ProductComponent } from './admin/product/product.component';
export const routes: Routes = [
  {
    path: '',
    component: SidebarComponent,
    title: 'side bar',
  },
  {
    path: 'product',
    component: ProductComponent,
    title: 'products',
  },
  {
    path: 'category',
    component: CategoryComponent,
    title: 'Category',
  },
  {
    path: 'addcategory',
    component: AddcategoryComponent,
    title: 'Add Category',
  },
  {
    path: 'addproduct',
    component: AddProductComponent,
    title: 'Add Product',
  },
  {
    path: 'categorydetails',
    component: CategorydetailsComponent,
    title: 'Category Details',
  },
  {
    path: 'customer',
    component: CustomerComponent,
    title: 'Customer',
  },
];
