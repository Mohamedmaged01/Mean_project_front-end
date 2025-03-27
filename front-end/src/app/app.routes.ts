import { Routes } from '@angular/router';
import { LoginComponent } from './Components/user/login/login.component';
import { HomeComponent } from './Components/user/home/home.component';
import { CallbackComponent } from './Components/user/callback/callback.component';
import{ListWishlistComponent} from './Components/user/list-wishlist/list-wishlist.component';
import { SignupComponent } from './Components/user/signup/signup.component'; 
import{CartComponent} from './Components/user/cart/cart.component';
import{UserInfoForAdminComponent} from './Components/user/user-info-for-admin/user-info-for-admin.component';

// import { ForgotPasswordComponent } from './forgot-password.component';
export const routes: Routes = [
    { path: 'signup', component: SignupComponent }, 
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'wishlist', component: ListWishlistComponent },
    { path: 'cart', component: CartComponent },
    { path: 'userinfo', component: UserInfoForAdminComponent },
    { path: 'callback', component: CallbackComponent }
   
    // { path: 'forgot-password', component: ForgotPasswordComponent }


];


