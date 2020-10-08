import { Component, OnInit } from '@angular/core';
import {FormControl , FormGroup , Validators} from '@angular/forms';
import {AuthService} from 'src/app/services/auth.service';
declare let $:any;
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm:FormGroup;
  constructor(private _AuthService:AuthService) { }
   successMessage:any;
   isSuccess = false;
   isClicked:boolean = false;
   NotSuccessMessage:any;
   NotSuccessAlert:boolean= false;
  userData(registerFormValue){
       this.isClicked = true ;
      if(registerFormValue.valid == true){
       this._AuthService.signUp(registerFormValue.value).subscribe((data)=>{
         console.log(data);
         if(data.message == 'success'){
           this.signUpForm.reset();
           this.isSuccess = true ;
           this.successMessage = data.message;
           this.isClicked = false ;
           this.NotSuccessAlert = false ;
           
         }else{
          this.NotSuccessMessage = data.errors.email.message;
          this.NotSuccessAlert = true ;
          this.isClicked = false ;
          this.isSuccess = false ;
        }
       });
      }

  }
  
  ngOnInit(): void {
    $('#signUp').particleground();
   this.signUpForm = new FormGroup({
     first_name : new FormControl(null , [Validators.required , Validators.pattern(/^[A-Za-z]{3,7}$/)]),
     last_name : new FormControl(null , [Validators.required , Validators.pattern(/^[A-Za-z]{3,7}$/)]),
     email : new FormControl(null , [Validators.required , Validators.email]),
     age : new FormControl(null , [Validators.required , Validators.min(16) , Validators.max(70)]),
     password : new FormControl(null , [Validators.required , Validators.pattern(/^[A-Za-z0-9]{5,12}$/)])
   });

  }

}
