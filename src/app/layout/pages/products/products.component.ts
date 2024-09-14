import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Component, ElementRef, ViewChild, Pipe } from '@angular/core';
import { ProductsService } from '../../../shared/services/products.service';
import { debounce, debounceTime, distinct, distinctUntilChanged, filter, fromEvent, map, switchAll, switchMap, tap } from 'rxjs';
import { log } from 'console';
 
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  allMovies: any =[]
  // form: FormGroup =

  constructor(private _ProductsService :ProductsService,private _HttpClient:HttpClient){}
   
  @ViewChild('mySearchInput') y !: ElementRef
  searchFlag :boolean =false;

  ngOnInit(): void{
    if(typeof localStorage !== "undefined"){
      localStorage.setItem('currentPage','/products')
    }
           
  }
  ngAfterViewInit(): void
    {
      fromEvent(this.y.nativeElement ,'keyup')
      .pipe(
        map((res:any) =>{res.target.value}),
        // filter((res:any)=> res.length>2),
        tap(()=>this.searchFlag=true),
        debounceTime(4000),
        distinctUntilChanged(),
        switchMap((searchText)=> this._HttpClient.get(`http://www.omdbapi.com/?s=${searchText}&apikey=e8067b53`)),
        map((res:any)=>res.Search)
      ).subscribe({
        next : (res)=>{
          console.log(res);
          this.allMovies =res
          this.searchFlag=false
        }
      })
    }
}

