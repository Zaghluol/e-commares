import { Routes } from '@angular/router';
import { HomeComponent } from './layout/pages/home/home.component';
import { CartComponent } from './layout/pages/cart/cart.component';
import { CategoriesComponent } from './layout/pages/categories/categories.component';
import { LoginComponent } from './layout/pages/login/login.component';
import { ProductsComponent } from './layout/pages/products/products.component';
import { RegisterComponent } from './layout/pages/register/register.component';
import { authGuard } from './shared/guard/auth.guard';
import { ForgetPasswordComponent } from './layout/additions/forget-password/forget-password.component';
import { ProductDetailsComponent } from './layout/additions/product-details/product-details.component';
import { UserDataComponent } from './layout/additions/user-data/user-data.component';

export const routes: Routes = [
    {path : "" , redirectTo : "home" , pathMatch : 'full'},
    {path : "home" ,canActivate :[authGuard] , component : HomeComponent},
    {path : "cart" , canActivate :[authGuard] , component :  CartComponent},
    {path : "categories" ,canActivate :[authGuard] , component : CategoriesComponent },
    {path : "brands" ,loadComponent :()=> import('./layout/pages/brands/brands.component').then((B)=>B.BrandsComponent) },
    {path : "products" ,canActivate :[authGuard] , component : ProductsComponent },
    {path : "userData/:cId" ,canActivate :[authGuard] , component : UserDataComponent },
    {path : "ProductDetails/:id" ,canActivate :[authGuard] , component : ProductDetailsComponent },
    {path : "register" , component : RegisterComponent },
    {path : "forgetPassword" , component : ForgetPasswordComponent },
    {path : "login" , component : LoginComponent }
];
