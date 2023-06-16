import { Component } from '@angular/core';
import {UsersService} from "../../services/users.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  name: string;
  email: string;
  birth: string;
  role: string;

  constructor(
    private router: Router,
    private usersService: UsersService
  ) {}

  registrateUser(){
    let body={
      name: this.name,
      birth: this.birth,
      email: this.email,
      role: this.role
    };

    console.log('Ты пидор', body);
    this.usersService.addNewUser(body).subscribe((elem)=>{
      this.router.navigate(['login']);
    });
  }

}
