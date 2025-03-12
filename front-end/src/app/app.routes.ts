import { Routes } from '@angular/router';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { CategoryComponent } from './admin/category/category.component';
import { AddcategoryComponent } from './admin/addcategory/addcategory.component';
import { CategorydetailsComponent } from './admin/categorydetails/categorydetails.component';
import { CustomerComponent } from './admin/customer/customer.component';

export const routes: Routes = [
    {
        path: '',
        component:SidebarComponent,
        title:'side bar'
    },
    {
        path: 'category',
        component:CategoryComponent,
        title: 'Category'
    },
    {
        path:'addcategory',
        component:AddcategoryComponent,
        title:'Add Category'
    },
    {
        path:'categorydetails',
        component:CategorydetailsComponent,
        title:'Category Details' 
    },
    {
        path:'customer',
        component:CustomerComponent,
        title:'Customer'
    }
];
