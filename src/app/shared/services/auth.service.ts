import { MytranslateService } from './mytranslate.service';
import { Login, Register } from './../interfaces/register';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Environment } from '../../layout/Base/Environment';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData : BehaviorSubject<any> = new BehaviorSubject(null)
  
  constructor(private _MytranslateService:MytranslateService 
    , private _HttpClient : HttpClient , private _Router:Router) {
    
    if(typeof localStorage !== 'undefined'){
      if(localStorage.getItem("userToken") !== null){
        this.userInfo() 
       this._Router.navigate([localStorage.getItem("currentPage")])
      }
    }

  }

  sendRegister(data:Register):Observable<any>{
    return this._HttpClient.post(`${Environment.BaseUrl}/api/v1/auth/signup` , data)
  }
  sendLogin(data:Login):Observable<any>{
    return this._HttpClient.post(`${Environment.BaseUrl}/api/v1/auth/signin` , data)
  }
  forgetPassword(data:Login):Observable<any>{
    return this._HttpClient.post(`${Environment.BaseUrl}/api/v1/auth/forgotPasswords` , data)
  }
  verifyResetCode(data:any):Observable<any>{
    return this._HttpClient.post(`${Environment.BaseUrl}/api/v1/auth/verifyResetCode` , data)
  }
  sendNewPassword(data:any):Observable<any>{
    return this._HttpClient.post(`${Environment.BaseUrl}/api/v1/auth/resetPassword` , data)
  }
   
  
  userInfo(){
    this.userData.next(localStorage.getItem('userToken'))
    console.log(this.userData.getValue());    
  }
}
