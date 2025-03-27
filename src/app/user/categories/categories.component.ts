import { Component, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements AfterViewInit, OnDestroy {
  categories: any[] = [];
  isLoading = true;
  private swiper!: Swiper;

  @ViewChild('flashSalesSlider', { static: false }) flashSalesSlider!: ElementRef;
  @ViewChild('prevButton', { static: false }) prevButton!: ElementRef;
  @ViewChild('nextButton', { static: false }) nextButton!: ElementRef;

  constructor(private categoryService: CategoryService, private router: Router) {}

  ngOnInit() {
    this.loadCategories();
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
    if (this.swiper) {
      this.swiper.destroy(true, true);
    }
  }

  private loadCategories(): void {
    this.isLoading = true;
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = Array.isArray(data) ? data.slice(0, 12) : [];
        this.isLoading = false;

        setTimeout(() => {
          this.initializeSwiper();
        }, 0);
      },
      error: (err) => {
        console.error('Error loading categories:', err);
        this.isLoading = false;
        this.categories = [];
      },
    });
  }

  private initializeSwiper(): void {
    if (!this.flashSalesSlider?.nativeElement) {
      console.error('Swiper container not found');
      return;
    }

    if (this.swiper) {
      this.swiper.destroy(true, true);
    }

    this.swiper = new Swiper(this.flashSalesSlider.nativeElement, {
      modules: [Navigation],
      slidesPerView: 'auto',
      freeMode: true,
      watchSlidesProgress: true,
      spaceBetween: 20,
      navigation: {
        nextEl: this.nextButton?.nativeElement,
        prevEl: this.prevButton?.nativeElement,
        disabledClass: 'swiper-button-disabled'
      },
      breakpoints: {
        320: { slidesPerView: 2, spaceBetween: 10 },
        640: { slidesPerView: 3, spaceBetween: 15 },
        768: { slidesPerView: 4, spaceBetween: 15 },
        992: { slidesPerView: 5, spaceBetween: 20 },
        1200: { slidesPerView: 6, spaceBetween: 20 },
      },
    });
  }

  filterByCategory(categoryId: string) {
    this.router.navigate(['/userproducts', categoryId]);
  }
}
