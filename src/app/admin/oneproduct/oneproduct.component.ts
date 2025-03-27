import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product-service.service';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-oneproduct',
  imports: [CommonModule, FormsModule],
  templateUrl: './oneproduct.component.html',
  styleUrl: './oneproduct.component.css',
})
export class OneproductComponent {
  productId: string = '';
  product: any = null;

  constructor(@Inject(ProductService) private productService: ProductService) {}

  fetchProduct(): void {
    if (!this.productId) {
      alert('Please enter a product ID.');
      return;
    }

    this.productService.getProductById(this.productId).subscribe(
      (response) => {
        console.log('🔍 Product fetched:', response);
        this.product = response;
      },
      (error) => {
        console.error('❌ Error fetching product:', error);
        alert('Product not found.');
      }
    );
  }
}
