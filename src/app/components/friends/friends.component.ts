import {Component, OnInit} from '@angular/core';
import {IUser} from "../../interfaces/user";
import {UsersService} from "../../services/users.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit{

  friends: Array<IUser>
  id: number;

  constructor(
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.params['id'];
    this.id = id;

    this.usersService.getFriends(id).subscribe(friends =>{
      this.friends = friends;
    });
  }

}
