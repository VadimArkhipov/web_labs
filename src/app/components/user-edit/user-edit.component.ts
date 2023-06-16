import {Component, OnInit} from '@angular/core';
import {IUser} from "../../interfaces/user";
import {UsersService} from "../../services/users.service";
import {ActivatedRoute, Router} from "@angular/router";
import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit{

  user: IUser;

  role: string;
  activeUserRole: string;

  constructor(
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
  ) {
    // @ts-ignore
    this.activeUserRole = JSON.parse(sessionStorage.getItem('user')).role;
  }
  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.params['id'];

    this.usersService.getUser(id).subscribe(user =>{
      this.user = user;
      this.role = this.user.role;
    })

  }

  updateUser(){
    this.usersService.updateUser({
      id: this.user.id,
      name: this.user.name,
      birth: this.user.birth,
      email: this.user.email,
      role: this.user.role,
      status: this.user.status
    }).subscribe();
  }

  uploadImage(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("photo", file);


      this.usersService.storeUserImage(this.user.id, formData)
        .subscribe((response) => {
          this.user.photo = `https://127.0.0.1:7000/${file.name}`;

        });
    }
  }

  deletePhoto(){
    console.log('Удаление фото');
    this.usersService.deletePhoto(this.user.id).subscribe(msg => {
      console.log(msg);
    })
  }



}
