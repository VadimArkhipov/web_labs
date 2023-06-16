import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string;
  constructor(
    private router: Router,
    private authService: AuthService

  ){
    this.email = '';
  }

  login(){
    this.authService.login({email:this.email}).subscribe((user)=>{
      sessionStorage.setItem('user', JSON.stringify(user));
      if(user){
        this.router.navigate([`users/${user.id}`]);
      }
    })
  }

  registration(){
      this.router.navigate(['registration']);
    }

}
