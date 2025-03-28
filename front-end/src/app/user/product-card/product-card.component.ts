import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CartService } from '../../userservices/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  constructor(private router: Router, private cartService: CartService) { }

  Math = Math;

  @Input() product: any;
  @Input() searchQuery: string = '';

  ngOnInit() {
    console.log("Product Data:", this.product);
  }

  highlightText(text: string): string {
    if (!this.searchQuery || !text) return text;

    const regex = new RegExp(this.searchQuery, 'gi');
    return text.replace(regex, match =>
      `<span class="search-highlight">${match}</span>`
    );
  }

  addToCart() {
    let cart = localStorage.getItem('cart');
    let cartArray = cart ? JSON.parse(cart) : [];

    let productToAdd = {
      id: this.product._id,
      name: this.product.name,
      price: this.product.discountPrice || this.product.price,
      images: this.product.images
    };

    let existingProduct = cartArray.find((item: any) => item.id === productToAdd.id);

    if (existingProduct) {
    } else {
      cartArray.push(productToAdd);
    }

    console.log('Product being added:', productToAdd);

    localStorage.setItem('cart', JSON.stringify(cartArray));

    alert('Product added to cart successfully!');
  }

}