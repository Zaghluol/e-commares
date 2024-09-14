import { Login } from '../../../shared/interfaces/register';
import { AuthService } from '../../../shared/services/auth.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule , Validators} from '@angular/forms';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  errMassage : string = ''
  isLoading : boolean = false 
  constructor(private _AuthService:AuthService , private _Router:Router){}

  registerForm : FormGroup = new FormGroup(
     {
      name : new FormControl(null ,[Validators.required , Validators.minLength(3) , Validators.maxLength(20)]) ,
      email : new FormControl(null , [Validators.email , Validators.required]) ,
      password : new FormControl(null ,[Validators.required ,
        Validators.pattern(/^[A-Z][0-9]{6}/)]) ,
      rePassword : new FormControl(null , [Validators.required ,
        Validators.pattern(/^[A-Z][0-9]{6}/)]) ,
      phone : new FormControl(null , [Validators.required ,
        Validators.pattern(/^(010|011|012|015)[0-9]{8}$/)])
     }
     ,
     this.confirmPassword
    
  )
  confirmPassword(p: any){
    if(p.get('password').value === p.get('rePassword').value){
     return null;
    }
    else{
     return{'passMatched' : true}
    }
   }
   registerSubmit(){
    this.isLoading = true
    this._AuthService.sendRegister(this.registerForm.value).subscribe({
      next : (res)=>{

         this._Router.navigate(['/home'])
        console.log(res);
        this.isLoading =false
      },
      error :(err)=>{
         this.errMassage = err.error.message
         this.isLoading =false
      }
    })
    console.log(this.registerForm.value)
  }




 }
   

