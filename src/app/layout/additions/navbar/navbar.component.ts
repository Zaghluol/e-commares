import { AuthService } from '../../../shared/services/auth.service';
import { Component, effect } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MytranslateService } from '../../../shared/services/mytranslate.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink , RouterLinkActive,TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
   isLogin :boolean = false;
    
   constructor(private _MytranslateService :MytranslateService,private _AuthService:AuthService ,private _Router:Router){}

   ngOnInit(): void{

    this._AuthService.userData.subscribe(()=>{
      if(this._AuthService.userData.getValue() != null){
        this.isLogin =true
      }
      else{
        this.isLogin =false
      }
    })
   }
   logOut(){
    localStorage.removeItem("userToken")
    this._AuthService.userData.next(null)
    this._Router.navigate(['/login'])
   }

   changLangBtn(lang:string){
     localStorage.setItem("userLang",lang)
     this._MytranslateService.setLang()
   }
}
