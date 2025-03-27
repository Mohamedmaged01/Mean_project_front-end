import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product-service.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-updateproduct',
  imports: [FormsModule, CommonModule],
  templateUrl: './updateproduct.component.html',
  styleUrl: './updateproduct.component.css',
})
export class UpdateproductComponent {
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
        console.log('✏️ Product fetched for update:', response);
        this.product = response;
      },
      (error) => {
        console.error('❌ Error fetching product:', error);
        alert('Product not found.');
      }
    );
  }

  updateProduct(): void {
    this.productService.updateProduct(this.productId, this.product).subscribe(
      (response) => {
        console.log('✅ Product updated:', response);
        alert('Product updated successfully.');
      },
      (error) => {
        console.error('❌ Error updating product:', error);
        alert('Failed to update product.');
      }
    );
  }
}
