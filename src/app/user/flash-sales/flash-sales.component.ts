import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerComponent } from '../timer/timer.component';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductService } from '../../services/product.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-flash-sales',
  standalone: true,
  imports: [CommonModule, RouterModule, TimerComponent, ProductCardComponent],
  templateUrl: './flash-sales.component.html',
  styleUrls: ['./flash-sales.component.css']
})

export class FlashSalesComponent implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }
}
