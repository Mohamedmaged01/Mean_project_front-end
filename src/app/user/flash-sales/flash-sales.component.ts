import { Component, AfterViewInit, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerComponent } from '../timer/timer.component';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductService } from '../../services/product.service';
import { RouterModule } from '@angular/router';
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

@Component({
  selector: 'app-flash-sales',
  standalone: true,
  imports: [CommonModule, RouterModule, TimerComponent, ProductCardComponent],
  templateUrl: './flash-sales.component.html',
  styleUrls: ['./flash-sales.component.css']
})
export class FlashSalesComponent implements OnInit, AfterViewInit {
  products: any[] = [];
  private swiper!: Swiper;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  @ViewChild('flashSalesSlider', { static: false }) flashSalesSlider!: ElementRef;

  ngAfterViewInit() {
    setTimeout(() => {
      this.initSwiper();
    });
  }

  private initSwiper(): void {
    Swiper.use([Navigation]);

    this.swiper = new Swiper(this.flashSalesSlider.nativeElement, {
      modules: [Navigation],
      slidesPerView: 4,
      spaceBetween: 20,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      loop: true,
      breakpoints: {
        320: { slidesPerView: 1, spaceBetween: 10 },
        640: { slidesPerView: 2, spaceBetween: 15 },
        992: { slidesPerView: 3, spaceBetween: 20 },
        1200: { slidesPerView: 4, spaceBetween: 20 }
      }
    });
  }
}
