import { Routes } from '@angular/router';

import { LoginComponent } from './Components/user/login/login.component';
import { HomeComponent } from './Components/user/home/home.component';
import { CallbackComponent } from './Components/user/callback/callback.component';
import { SignupComponent } from './Components/user/signup/signup.component'; // Assume you create this
// import { ForgotPasswordComponent } from './forgot-password.component';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { CategoryComponent } from './admin/category/category.component';
import { AddcategoryComponent } from './admin/addcategory/addcategory.component';
import { CategorydetailsComponent } from './admin/categorydetails/categorydetails.component';
export const routes: Routes = [
    { path: 'signup', component: SignupComponent }, 
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'callback', component: CallbackComponent },
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
        path:'categorydetails/:id',
        component:CategorydetailsComponent,
        title:'Category Details' 
    }
];
