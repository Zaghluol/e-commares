import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { Router, RouterLink} from '@angular/router';


@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule , RouterLink],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
  constructor(private _AuthService:AuthService , private _Router:Router){}
  errMassege :any = ''
  isCodeForm :boolean = false
  isNewPassForm :boolean = false
  isLoading :boolean = false
  emailForm : FormGroup =new FormGroup({
    email : new FormControl(null ,[Validators.required , Validators.email])
  })

  codeForm : FormGroup =new FormGroup({
    resetCode : new FormControl(null ,[Validators.required])
  })
  
  resetPassForm : FormGroup =new FormGroup({
    email : new FormControl(null ,[Validators.required , Validators.email]),
    newPassword : new FormControl(null ,[Validators.required ,
      Validators.pattern(/^[A-Z][0-9]{6}/)])
  })
  verifyBtn(){
    this.isLoading = true
    this._AuthService.forgetPassword(this.emailForm.value).subscribe({
      next : (res)=>{
       if(res.statusMsg == 'success'){
        this.isCodeForm = true
        this.isLoading = false
       }  
      },
      error : (err)=>{}
     })
  }
  codeBtn(){
    this.isLoading = true
    this._AuthService.verifyResetCode(this.codeForm.value).subscribe({
      next : (res)=>{
       if(res.status == "Success"){
        this.isCodeForm = false
        this.isNewPassForm = true
        this.isLoading = false
       }  
      },
      error : (err)=>{}
     })
  }
  newPass(){
    this.isLoading = true
     this._AuthService.sendNewPassword(this.resetPassForm.value).subscribe({
      next : (res)=>{
        localStorage.setItem("userToken", res.token)  
        this._AuthService.userInfo()
        this._Router.navigate(['/home'])
        console.log("yesssssss");
        
        this.isLoading =false
      },
      error : (err)=>{
        this.errMassege = err.error.message
        console.log(err.error.message);
        this.isLoading =false
      }
     })
    }
  }
