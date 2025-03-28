import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isNavbarCollapsed = true;
  searchQuery: string = '';
  showMobileSearch = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isNavbarCollapsed = true;
      }
    });
  }

  closeNavbar() {
    this.isNavbarCollapsed = true;
  }

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  toggleMobileSearch() {
    const offcanvas = document.getElementById('mobileSearchOffcanvas');
    const bsOffcanvas = new (window as any).bootstrap.Offcanvas(offcanvas);

    bsOffcanvas.show();

    setTimeout(() => {
      const searchInput = document.getElementById('mobileSearchInput');
      if (searchInput) {
        searchInput.focus();
      }
    }, 100);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  searchProducts(event?: Event) {
    if (event) {
      event.preventDefault();
    }

    const query = this.searchQuery?.trim();

    if (!query) {
      this.router.navigate(['/userproducts']);
      return;
    }

    this.router.navigate(['/userproducts'], {
      queryParams: { search: query },
      queryParamsHandling: 'merge'
    });

    this.closeMobileSearch();
    console.log("Searching for:", this.searchQuery);

    const offcanvas = document.getElementById('mobileSearchOffcanvas');
    const bsOffcanvas = new (window as any).bootstrap.Offcanvas(offcanvas);
    bsOffcanvas.hide();

    if (this.searchQuery.trim()) {
      this.router.navigate(['/userproducts'], { queryParams: { q: this.searchQuery } });
    }
  }

  clearSearch() {
    this.searchQuery = '';
    this.router.navigate(['/userproducts']);
    this.closeMobileSearch();
  }

  private closeMobileSearch() {
    if (this.showMobileSearch) {
      const offcanvas = document.getElementById('mobileSearchOffcanvas');
      if (offcanvas) {
        const bsOffcanvas = new (window as any).bootstrap.Offcanvas(offcanvas);
        bsOffcanvas.hide();
      }
      this.showMobileSearch = false;
    }
  }

  onSearchInput() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/userproducts'], {
        queryParams: { search: this.searchQuery.trim() },
        queryParamsHandling: 'merge'
      });
    } else {
      this.router.navigate(['/userproducts']);
    }
  }
}
