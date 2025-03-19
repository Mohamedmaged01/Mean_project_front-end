import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  standalone: true,
  selector: 'app-callback',
  imports: [],
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.css'
})
export class CallbackComponent implements OnInit{
  
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

   ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log('Callback Query Params:', params);
      const token =   params['token'];
      if (token) {
        localStorage.setItem('token', token); 
        this.router.navigate(['/wishlist']); 
      } else {
        this.router.navigate(['/login']); 
      }
    });
  }
}
