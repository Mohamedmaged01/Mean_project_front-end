import { Component, Input } from '@angular/core';
import { CommonModule  } from '@angular/common';
import { Router} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  constructor(private router: Router){
  }

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
}
