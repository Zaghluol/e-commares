import { ProductsService } from './../../../shared/services/products.service';
import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, Inject, PLATFORM_ID, signal } from '@angular/core';
import { Product } from '../../../shared/interfaces/product';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class CategoriesComponent {
  allProducts : Product[] = []
  counter =signal(0)
  price =signal(40)
  qun =signal(100)
  total :any
  constructor(private _ProductsService:ProductsService){}

  ngOnInit(): void{
    this.total = computed(()=> this.price() * this.qun())
    
    this.price.set(70)

    if(typeof localStorage !== "undefined"){
      localStorage.setItem('currentPage','/categories')
    }  
    this._ProductsService.getAllProeducts().subscribe({
      next : (res)=>{
        console.log(res.data);
        this.allProducts = res.data
      }
    })   
  }
  increaseCounter(){
    this.counter.set(this.counter()+1)
  }
}
