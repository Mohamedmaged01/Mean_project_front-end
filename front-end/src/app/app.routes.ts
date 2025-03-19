import { Routes } from '@angular/router';
import { LoginComponent } from './Components/user/login/login.component';
import { HomeComponent } from './Components/user/home/home.component';
import { CallbackComponent } from './Components/user/callback/callback.component';
import{ListWishlistComponent} from './Components/user/list-wishlist/list-wishlist.component';
import { SignupComponent } from './Components/user/signup/signup.component'; // Assume you create this
// import { ForgotPasswordComponent } from './forgot-password.component';
export const routes: Routes = [
    { path: 'signup', component: SignupComponent }, 
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'wishlist', component: ListWishlistComponent },
    { path: 'callback', component: CallbackComponent }
   
    // { path: 'forgot-password', component: ForgotPasswordComponent }


];


