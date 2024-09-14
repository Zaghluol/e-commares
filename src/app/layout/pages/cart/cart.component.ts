import { ToastrService } from 'ngx-toastr';
import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CartService } from '../../../shared/services/cart/cart.service';
import { Product } from '../../../shared/interfaces/product';
import { RouterLink } from '@angular/router';
  
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
 myCartProducts :any[] =[]
  
 cartId !:string
  constructor(private _CartService : CartService ,private _ToastrService :ToastrService){}
 
  ngOnInit(): void{

    if(typeof localStorage !== "undefined"){
      localStorage.setItem('currentPage','/cart')
    }     
  
    this._CartService.getCart().subscribe({
      next :(res)=>{
        this.myCartProducts = res.data.products
        this.cartId = res.data._id
      }
    })
  }
  removeItemBtn(pId:string){
    this._CartService.removeItemCart(pId).subscribe({
      next : (res)=>{
        this.myCartProducts =res.data.products
        this._ToastrService.success("product deleted successflly")
      }
    })
  }

  editQuentityBtn(newCount:number , pId:string){

    if(newCount <= 0){
      this.removeItemBtn(pId)
      return
    }

    this._CartService.updateCart(pId,newCount).subscribe({
      next : (res)=>{
        this.myCartProducts =res.data.products
        this._ToastrService.success("product updated successflly")
      }
    })
  }
}
