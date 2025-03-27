import { Component, OnInit, Inject } from '@angular/core';
import { ProductService } from '../../services/product-service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent, RouterModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  searchQuery: string = '';
  dialog: any;

  constructor(
    @Inject(ProductService) private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data.products;
        this.filteredProducts = this.products;
        console.log(this.filteredProducts);
        console.log(this.products);
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  searchProducts(): void {
    if (this.searchQuery.trim()) {
      this.filteredProducts = this.products.filter((product) =>
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredProducts = this.products;
    }
  }

  deleteProduct(productId: string, productName: string): void {
    if (!productId) {
      console.error('❌ Cannot delete - invalid product ID:', productId);
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Delete',
        message: `Are you sure you want to delete ${productName}?`,
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: any) => {
      if (confirmed) {
        this.productService.deleteProduct(productId).subscribe({
          next: () => {
            console.log('✅ Product deleted successfully');
            this.fetchProducts();
          },
          error: (err) => {
            console.error('❌ Delete failed:', err);
          },
        });
      }
    });
  }
}
