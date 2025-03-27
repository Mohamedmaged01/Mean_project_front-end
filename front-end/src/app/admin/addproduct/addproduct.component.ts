import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ProductService } from '../../services/product-service.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.css',
})
export class AddProductComponent {
  product = {
    name: '',
    description: '',
    price: null,
    stock: null,
    image: '',
    category: '',
    seller_id: '',
  };

  constructor(
    @Inject(ProductService) private productService: ProductService,
    private router: Router
  ) {}

  onImageUpload(event: any): void {
    console.log('📷 Image Upload Event:', event);
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        console.log('📸 Image converted to base64');
        this.product.image = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
  debugProduct(): void {
    console.log(this.product);
  }
  addProduct(): void {
    console.log('🚀 Submitting Product:', this.product);

    // Check if required fields are missing
    if (
      !this.product.name ||
      !this.product.price ||
      this.product.stock === null ||
      !this.product.category ||
      !this.product.seller_id
    ) {
      console.error('❌ Validation Error: Missing required fields');
      alert(
        'Please fill in all required fields: Name, Price, Stock, Category, and Seller ID.'
      );
      return;
    }

    this.productService.addProduct(this.product).subscribe(
      (response) => {
        console.log('✅ Product added successfully:', response);
        this.router.navigate(['/product']); // Redirect after success
      },
      (error) => {
        console.error('❌ Error adding product:', error);
      }
    );
  }
}
