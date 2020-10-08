import { Component, OnInit } from '@angular/core';
import {AuthService} from 'src/app/services/auth.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(public _AuthService:AuthService , private _Router:Router) { 
    
  }
  signout(){
    localStorage.clear();
    this._Router.navigate(['/signin']);
  }
  ngOnInit(): void {
  }

}
