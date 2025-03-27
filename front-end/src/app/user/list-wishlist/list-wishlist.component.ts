import { Component,OnInit,OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{Product} from  '../../../../interfaces/Product_model';
import { ActivatedRoute, Router } from '@angular/router';
import { WishlistService } from '../../userservices/wishlist.service';

import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
@Component({
  standalone: true,
  selector: 'app-list-wishlist',
  imports: [CommonModule],
  templateUrl: './list-wishlist.component.html',
  styleUrl: './list-wishlist.component.css'
})
export class ListWishlistComponent implements OnInit ,OnDestroy {
  wishlistItems: Product[] = [];
  totalItems: number = 0;
  totalPages: number = 0;
  currentPage: number = 1;
  pageSize: number = 10;
  private subscriptions = new Subscription();

  constructor(private wishlistService: WishlistService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.wishlistService.wishlistItems$.subscribe(
        items => this.wishlistItems = items
      )
    );
    this.subscriptions.add(
      this.wishlistService.totalItems$.subscribe(
        total => this.totalItems = total
      )
    );
    this.subscriptions.add(
      this.wishlistService.totalPages$.subscribe(
        pages => this.totalPages = pages
      )
    );
    this.subscriptions.add(
      this.wishlistService.currentPage$.subscribe(
        page => this.currentPage = page
      )
    );
  }

  addToWishlist(product: Product): void {
    this.subscriptions.add(
      this.wishlistService.addToWishlist(product).subscribe({
        next: () => console.log('Product added to wishlist'),
        error: () => {}
      })
    );
  }

  removeFromWishlist(product: Product): void {
    this.subscriptions.add(
      this.wishlistService.removeFromWishlist(product).subscribe({
        next: () => console.log('Product removed from wishlist'),
        error: () => {}
      })
    );
  }

  goToPage(page: number): void {
    this.wishlistService.goToPage(page, this.pageSize);
  }

  changePageSize(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.pageSize = parseInt(selectElement.value, 10);
    this.wishlistService.goToPage(1, this.pageSize);
  }

  clearError(): void {
    this.wishlistService.clearError();
  }

  handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'https://via.placeholder.com/100?text=No+Image';
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  get loading$() { return this.wishlistService.loading$; }
  get error$() { return this.wishlistService.error$; }
}
