import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LoginComponent} from './Components/user/login/login.component';
import {SignupComponent} from './Components/user/signup/signup.component';
import{ListWishlistComponent} from './Components/user/list-wishlist/list-wishlist.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,LoginComponent,SignupComponent,ListWishlistComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front-end';
}
