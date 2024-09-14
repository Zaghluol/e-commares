import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../../layout/Base/Environment';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
 
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _HttpClient : HttpClient) { }

  getAllProeducts():Observable<any>
  {
    return this._HttpClient.get(`${Environment.BaseUrl}/api/v1/products`)
  }
  getSpecificProeduct(pId:string|null):Observable<any>
  {
    return this._HttpClient.get(`${Environment.BaseUrl}/api/v1/products/${pId}`)
  }
  getPosts():Observable<any>
  {
    return this._HttpClient.get("https://jsonplaceholder.typicode.com/posts")
  }
  getUsers(userId : number):Observable<any>
  {
    return this._HttpClient.get(`https://jsonplaceholder.typicode.com/users?id=${userId}`)
  }
}
