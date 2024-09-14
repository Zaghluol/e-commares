import { Product } from './../../../shared/interfaces/product';
import { Component } from '@angular/core';
import { ProductsService } from '../../../shared/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { CarouselModule ,OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
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
  product :Product|any ={}
  pId :string|null =''
  constructor(private _CartService :CartService,private _ProductsService :ProductsService ,private _ActivatedRoute :ActivatedRoute ,private _ToastrService :ToastrService){}
  
  ngOnInit(): void{
 
    this._ActivatedRoute.paramMap.subscribe((p)=>{
      this.pId = p.get('id')

       this._ProductsService.getSpecificProeduct(this.pId).subscribe({
        next :(res)=>{
          this.product =res.data
          console.log(res.data);
        },
        error : ()=>{}
       })
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
