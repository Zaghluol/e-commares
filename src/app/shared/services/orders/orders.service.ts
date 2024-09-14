import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../../../layout/Base/Environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  userHeader :any ={token : localStorage.getItem("userToken")}

  constructor(private _HttpClient :HttpClient) { }

  checkOut(cId:string,userDataValue:any):Observable<any>{
    return this._HttpClient.post(`${Environment.BaseUrl}/api/v1/orders/checkout-session/${cId}?url=http://localhost:4200` , 
      {shippingAddress:userDataValue}
  )
  }
}
