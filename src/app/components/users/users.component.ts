import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../services/users.service";
import {IUser} from "../../interfaces/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
  users: Array<IUser>;

  constructor(
    private usersService: UsersService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.usersService.getUsers().subscribe((users)=>{
      this.users = users;
      for (let user of users){
        if(user.role === 'user'){
          user.role = 'Пользователь';
        } else {
          user.role = 'Администратор'
        }

        if (user.status === 'waiting'){
          user.status = 'Ожидает подтверждения';
        } else if (user.status === 'active'){
          user.status = 'Активный';
        } else {
          user.status = 'Заблокированный'
        }
      }
    })
  }

  confirmDeleteUser(id:number, name:string){
    let decision:boolean = confirm(`Вы действительно хотите удалить пользователя ${name}?`);
    if(decision){
      this.usersService.deleteUser(id).subscribe((res) => {
        this.users = this.users.filter(elem=> elem.id !== id);
        this.router.navigate(['users',this.users]);
      });

    }
  }
}
