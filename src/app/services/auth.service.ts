import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import{Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 baseUrl:string = "https://routeegypt.herokuapp.com/";
  constructor(private _HttpClient:HttpClient) {}
  signUp(signUpFormValue):Observable<any>{
    return this._HttpClient.post('https://routeegypt.herokuapp.com/signup' , signUpFormValue);
  };
  signIn(data):Observable<any>{
   return this._HttpClient.post(this.baseUrl + 'signin' , data);
  };
  isLogged(){
    return !!localStorage.getItem('currentUser');
  }
}
