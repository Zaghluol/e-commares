import { Component } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule , RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    errMassage : string = ''
    isLoading : boolean = false 
    constructor(private _AuthService:AuthService , private _Router:Router){}
  
    loginForm : FormGroup = new FormGroup(
       {
        email : new FormControl(null , [Validators.email , Validators.required]) ,
        password : new FormControl(null ,[Validators.required ,
          Validators.pattern(/^[A-Z][0-9]{6}/)]) , 
       } 
    )
     loginSubmit(){
      this.isLoading = true
      this._AuthService.sendLogin(this.loginForm.value).subscribe({
        next : (res)=>{ 
          localStorage.setItem('userToken' , res.token)
          this._AuthService.userInfo()
           this._Router.navigate(['/home'])
          this.isLoading =false
        },
        error :(err)=>{
           this.errMassage = err.error.message
           this.isLoading =false
        }
      })
      console.log(this.loginForm.value)
    }

  
  
   }

