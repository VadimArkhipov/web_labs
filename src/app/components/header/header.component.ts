import {Component, Input} from '@angular/core';
import {IUser} from "../../interfaces/user";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  user: IUser;

  constructor() {
    // @ts-ignore
    this.user = JSON.parse(sessionStorage.getItem('user'));
  }

}
