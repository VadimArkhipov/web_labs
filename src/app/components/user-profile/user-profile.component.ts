import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../services/users.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{

  id: number;
  name: string;
  birth: string;
  email: string;
  photo: string;
  role: string;
  status: string;

  constructor(private usersService: UsersService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {

    this.id = this.activatedRoute.snapshot.params['id'];

    this.usersService.getUser(this.id).subscribe(user =>{
      this.name = user.name;
      this.birth = user.birth;
      this.email = user.email;
      this.photo = user.photo;
      this.role = user.role;
      this.status = user.status;
    });

  }

}
