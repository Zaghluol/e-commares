import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  
  if (typeof localStorage !== "undefined") {
    if(localStorage.getItem('userToken') != null){

      let myToken:any ={token :localStorage.getItem("userToken")}
    
      req = req.clone({
         setHeaders : myToken
      })
    }
  }
  
  return next(req);
};
