import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { ProductDetailsComponent } from './app/user/product-details/product-details.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter([
      { path: 'product/:id', component: ProductDetailsComponent },
      { path: '**', redirectTo: '/', pathMatch: 'full' }
    ])
  ]
});
