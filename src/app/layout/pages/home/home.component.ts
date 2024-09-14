import { CurrencyPipe, DatePipe, isPlatformBrowser, LowerCasePipe, UpperCasePipe } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ProductsService } from '../../../shared/services/products.service';
import { Product } from '../../../shared/interfaces/product';
import { RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { SearchPipe } from '../../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MytranslateService } from '../../../shared/services/mytranslate.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink ,CarouselModule,FormsModule , TranslateModule ,SearchPipe, LowerCasePipe ,UpperCasePipe, CurrencyPipe ,DatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: true
  }
  
  allProducts :Product[] =[]
userWord: string ="";

  constructor(private _MytranslateService :MytranslateService ,
    private _ToastrService :ToastrService,private _ProductsService :ProductsService ,private _CartService : CartService){}

  ngOnInit(): void{
    if(typeof localStorage !== "undefined"){
      localStorage.setItem('currentPage','/home')
    }     
 
    this._ProductsService.getAllProeducts().subscribe({
      next :(res)=>{
        this.allProducts = res.data
        console.log(res.data);
      },
      error :(err)=>{
        console.log(err);
      }
    })
  }
  addCartBtn(pId:string){
    this._CartService.addToCart(pId).subscribe({
      next :(res)=>{
        this._ToastrService.success(res.message)
      }
    })
  }
}
