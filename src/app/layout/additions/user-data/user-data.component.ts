import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { OrdersService } from '../../../shared/services/orders/orders.service';
 
@Component({
  selector: 'app-user-data',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-data.component.html',
  styleUrl: './user-data.component.css'
})
export class UserDataComponent {
  cId !:string
  constructor(private _ActivatedRoute :ActivatedRoute ,private _OrdersService :OrdersService){}

  userDataForm : FormGroup = new FormGroup(
    {
     details : new FormControl(null ,[Validators.required]) ,
     phone : new FormControl(null ,[Validators.required]) ,
     city : new FormControl(null ,[Validators.required]) 
     
    }
 )

 ngOnInit(): void{
  this._ActivatedRoute.paramMap.subscribe((p)=>{
    this.cId = p.get("cId")!
  })
 }
 checkOutBtn()
 {
   this._OrdersService.checkOut(this.cId, this.userDataForm.value).subscribe({
    next: (res) => {
      window.open(res.session.url,'_self') 
      
    }
  })
 }
}
