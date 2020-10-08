import { Component, OnInit } from '@angular/core';
import {FormControl , FormGroup , Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/services/auth.service';
declare let $:any;
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
signInForm:FormGroup;
  constructor(private _Router:Router , private _AuthService:AuthService) {
    if(this._AuthService.isLogged()){
      this._Router.navigate(['/home']);
    }
   }
  signInData(){
    if(this.signInForm.valid){
         this._AuthService.signIn(this.signInForm.value).subscribe((response)=>{
           console.log(response);
           if(response.message == 'success'){
               localStorage.setItem('currentUser',response.token);
               this._Router.navigate(['/home']);
           }
         })      
    }
   
  }
  ngOnInit(): void {
    $('#signIn').particleground();
   this.signInForm = new FormGroup({
     email:new FormControl(null , [Validators.required , Validators.email]),
     password:new FormControl(null , [Validators.required , Validators.pattern(/^[A-Za-z0-9]{5,12}$/)])
   })
  }

}
