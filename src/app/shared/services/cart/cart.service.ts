import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../layout/Base/Environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  userHeader :any ={token : localStorage.getItem("userToken")}
  constructor(private _HttpClient :HttpClient) { }

  getCart() :Observable<any>
  {
    return this._HttpClient.get(`${Environment.BaseUrl}/api/v1/cart`)
}
  
  addToCart(pId:string) :Observable<any>
  {
    return this._HttpClient.post(`${Environment.BaseUrl}/api/v1/cart`,
      {productId :pId}
      )
}
  updateCart(pId:string , c:number) :Observable<any>
  {
    return this._HttpClient.put(`${Environment.BaseUrl}/api/v1/cart/${pId}`,
      {count: c}
      )
}
  removeItemCart(pId:string) :Observable<any>
  {
    return this._HttpClient.delete(`${Environment.BaseUrl}/api/v1/cart/${pId}`
      )
}
  clearCart() :Observable<any>
  {
    return this._HttpClient.delete(`${Environment.BaseUrl}/api/v1/cart}`
    )
}


}