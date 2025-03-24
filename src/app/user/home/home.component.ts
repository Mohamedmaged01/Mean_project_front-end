import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CarouselComponent } from '../carousel/carousel.component';
import { FlashSalesComponent } from '../flash-sales/flash-sales.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SidebarComponent, CarouselComponent, FlashSalesComponent, RouterModule],
  templateUrl: './home.component.html'
})
export class HomeComponent {}
