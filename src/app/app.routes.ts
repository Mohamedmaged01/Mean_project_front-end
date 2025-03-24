import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './user/products/products.component';
import { ProductDetailsComponent } from './user/product-details/product-details.component';
import { FlashSalesComponent } from './user/flash-sales/flash-sales.component';
import { HomeComponent } from './user/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'flash-sales', component: FlashSalesComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
