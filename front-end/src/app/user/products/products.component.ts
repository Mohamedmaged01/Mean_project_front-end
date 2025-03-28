import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductListComponent implements OnInit {
  allProducts: any[] = [];
  filteredProducts: any[] = [];
  currentProduct: any = null;
  categoryId: string | null = null;
  isLoading: boolean = true;
  showMode: 'all' | 'category' | 'single' = 'all';
  searchQuery: string = '';
  searchNotFound: boolean = false;
  originalProducts: any[] = [];
  searchExecuted: boolean = false;
  showSuggestions: boolean = false;
  suggestions: any[] = [];
  products: any[] = [];
  minPrice: number | null = null;
  maxPrice: number | null = null;
  sortBy: string = '';
  order: string = 'asc';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.checkAuthentication();
    this.setupRouteListener();

    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['search'] || '';
      this.minPrice = params['minPrice'] ? +params['minPrice'] : null;
      this.maxPrice = params['maxPrice'] ? +params['maxPrice'] : null;
      this.sortBy = params['sortBy'] || '';
      this.order = params['order'] || 'asc';

      if (this.searchQuery) {
        this.searchProducts();
      } else {
        this.loadProductsWithFilters();
      }
    });
  }

  searchProducts() {
    if (!this.searchQuery.trim()) {
      this.clearSearch();
      return;
    }

    this.isLoading = true;
    this.searchExecuted = true;
    this.searchNotFound = false;

    this.productService.searchProducts(this.searchQuery).subscribe({
      next: (response) => {
        this.allProducts = response.data || [];
        this.searchNotFound = this.allProducts.length === 0;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Search error:', error);
        this.allProducts = [];
        this.searchNotFound = true;
        this.isLoading = false;
      }
    });
  }

  onSearchInput() {
    if (this.searchQuery.length > 0) {
      this.showSuggestions = true;
      this.suggestions = this.allProducts.filter(product =>
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        (product.category?.name && product.category.name.toLowerCase().includes(this.searchQuery.toLowerCase())) ||
        product._id.toLowerCase().includes(this.searchQuery.toLowerCase())
      ).slice(0, 5);
    } else {
      this.showSuggestions = false;
      this.clearSearch();
    }
  }

  selectSuggestion(item: any) {
    this.searchQuery = item.name;
    this.showSuggestions = false;
    this.searchProducts();
  }
  clearSearch() {
    this.searchQuery = '';
    this.showSuggestions = false;
    this.suggestions = [];
    this.searchExecuted = false;
    this.searchNotFound = false;

    const currentUrl = this.router.url;

    const categoryIdMatch = currentUrl.match(/\/userproducts\/([^\/\?]+)/);

    if (categoryIdMatch && categoryIdMatch[1]) {
        const categoryId = categoryIdMatch[1];
        this.router.navigate(['/userproducts', categoryId], {
            queryParamsHandling: 'merge'
        });
        this.loadProductsByCategory();
    }
    else {
        this.loadAllProducts();
        this.router.navigate(['/userproducts'], {
            queryParamsHandling: 'merge'
        });
    }
}

  trackByProductId(index: number, product: any): string {
    return product._id;
  }

  private checkAuthentication() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.isLoading = false;
    }
  }

  private setupRouteListener() {
    this.route.paramMap.subscribe(params => {
      this.categoryId = params.get('categoryId');
      const productId = params.get('id');

      if (productId) {
        this.loadSingleProduct(productId);
      } else if (this.categoryId) {
        this.loadProductsByCategory();
      } else {
        this.loadAllProducts();
      }
    });
  }

  private loadAllProducts() {
    this.isLoading = true;
    this.showMode = 'all';

    this.productService.getProducts().subscribe({
      next: (products) => {
        this.allProducts = products;
        this.originalProducts = [...products];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading all products:', err);
        this.allProducts = [];
        this.isLoading = false;
      }
    });
  }

  private loadProductsByCategory() {
    this.isLoading = true;
    this.showMode = 'category';

    if (!this.categoryId) return;

    this.productService.getProductsByCategory(this.categoryId).subscribe({
      next: (products) => {
        this.filteredProducts = products;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading products by category:', err);
        this.filteredProducts = [];
        this.isLoading = false;
      }
    });
  }

  private loadSingleProduct(productId: string) {
    this.isLoading = true;
    this.showMode = 'single';

    this.productService.getProductById(productId).subscribe({
      next: (product) => {
        this.currentProduct = product;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading product:', err);
        this.currentProduct = null;
        this.isLoading = false;
      }
    });
  }

  loadProductsWithFilters() {
    this.isLoading = true;

    const filters = {
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      sortBy: this.sortBy,
      order: this.order,
      search: this.searchQuery
    };

    this.productService.getProducts().subscribe({
      next: (products) => {
        this.allProducts = products;
        this.originalProducts = [...products];
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.isLoading = false;
      }
    });
  }

  applyFilters() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        minPrice: this.minPrice,
        maxPrice: this.maxPrice,
        sortBy: this.sortBy,
        order: this.order,
        search: this.searchQuery
      },
      queryParamsHandling: 'merge'
    });
  }

  resetFilters() {
    this.minPrice = null;
    this.maxPrice = null;
    this.sortBy = '';
    this.order = 'asc';
    this.searchQuery = '';
    this.searchExecuted = false;
    this.showSuggestions = false;

    this.loadProductsWithFilters();
  }
}
