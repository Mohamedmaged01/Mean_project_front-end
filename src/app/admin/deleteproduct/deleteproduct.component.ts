import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product-service.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-deleteproduct',
  imports: [FormsModule],
  templateUrl: './deleteproduct.component.html',
  styleUrl: './deleteproduct.component.css',
})
export class DeleteproductComponent {
  productId: string = '';

  constructor(@Inject(ProductService) private productService: ProductService) {}

  deleteProduct(): void {
    if (!this.productId) {
      alert('Please enter a product ID.');
      return;
    }

    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(this.productId).subscribe({
        next: (response) => {
          console.log('🗑 Product deleted:', response);
          alert('Product deleted successfully.');
          this.productId = '';
        },
        error: (error) => {
          console.error('❌ Error deleting product:', error);
          alert('Failed to delete product.');
        },
      });
    }
  }
}
