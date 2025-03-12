import { Routes } from '@angular/router';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { CategoryComponent } from './admin/category/category.component';
import { AddcategoryComponent } from './admin/addcategory/addcategory.component';

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
    }
];
