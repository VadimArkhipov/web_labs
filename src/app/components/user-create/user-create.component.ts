import {Component, OnInit} from '@angular/core';
import {IUser} from "../../interfaces/user";
import {UsersService} from "../../services/users.service";
import {ActivatedRoute, Router} from "@angular/router";
import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent{

  name: string;
  email: string;
  birth: string;
  role: string;
  constructor(
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  addUser(){
    let data ={
      name: this.name,
      birth: this.birth,
      email: this.email,
      role: this.role
    };

    this.usersService.addNewUser(data).subscribe((elem)=>{
      this.router.navigate(['users']);
    });
  }

}
