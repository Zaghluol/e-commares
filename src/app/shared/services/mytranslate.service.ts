import { isPlatformBrowser } from '@angular/common';
import { Inject,  Injectable, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { platform } from 'os';
 
@Injectable({
  providedIn: 'root'
})
export class MytranslateService {

  constructor(private _TranslateService:TranslateService ,
    @Inject (PLATFORM_ID) private platformid:object
  ) {

    _TranslateService.setDefaultLang("en")

     this.setLang()
  }

  setLang(){
    if(isPlatformBrowser(this.platformid)){
      if(localStorage.getItem("userLang")){
        this._TranslateService.use(localStorage.getItem("userLang")!)
   
        if(localStorage.getItem("userLang") =="en"){
          document.body.dir ='ltr'
        }
        else if(localStorage.getItem("userLang") =="ar"){
          document.body.dir ='rtl'
        }
      }
    }
  }

}
