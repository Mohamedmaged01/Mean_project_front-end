import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  Math = Math;
  product: any;
  errorMessage: string = '';
  productId: string = '';
  quantity: number = 1;
  cart: any[] = [];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.productId = params.get('id') || '';
      console.log('Product ID from Route:', this.productId);

      this.productService.getProductById(this.productId).subscribe({
        next: (data) => {
          console.log('Product Data:', data);
          this.product = data?.data;
        },
        error: (error) => {
          console.error('Error fetching product:', error);
          this.errorMessage = 'Error loading product details.';
        },
      });
    });
  }
  addToCart() {
    let cart = localStorage.getItem('cart');
    let cartArray = cart ? JSON.parse(cart) : [];

    let productToAdd = {
      id: this.product._id,
      name: this.product.name,
      price: this.product.discountPrice || this.product.price,
      quantity: this.quantity,
      images: this.product.images
    };

    let existingProduct = cartArray.find((item: any) => item.id === productToAdd.id);

    if (existingProduct) {
      existingProduct.quantity += this.quantity;
    } else {
      cartArray.push(productToAdd);
    }

    console.log('Product being added:', productToAdd);

    localStorage.setItem('cart', JSON.stringify(cartArray));

    alert('Product added to cart successfully!');
  }

}
