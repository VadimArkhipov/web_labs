import {Component, OnInit} from '@angular/core';
import {IUser} from "../../interfaces/user";
import {IPost} from "../../interfaces/news";
import {UsersService} from "../../services/users.service";
import {ActivatedRoute} from "@angular/router";
import {WebsocketService} from "../../services/websocket.service";

@Component({
  selector: 'app-friends-news',
  templateUrl: './friends-news.component.html',
  styleUrls: ['./friends-news.component.css']
})
export class FriendsNewsComponent implements OnInit{

  friends: Array<IUser>;
  news: Array<IPost>;
  id: Number;


  constructor(
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private websocketService: WebsocketService
  ) {
    this.websocketService.listenToServer('message').subscribe(
      (post: any)=>{
        this.news.unshift(post.text);
        console.log(post.text);
      }
    );
  }
  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.params['id'];
    this.id = id;

    this.usersService.getFriends(id).subscribe(friends =>{
      this.friends = friends;
    });

    this.usersService.getFriendsNews(id).subscribe(news =>{
      this.news = news;
      for(let post of news) {
        // @ts-ignore
        post.author = this.friends.find(elem => elem.id === post.id);
        let date = new Date(post.time);
        post.prettyDate = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()} ${date.toLocaleTimeString()}`;
      }
    });
  }

}
