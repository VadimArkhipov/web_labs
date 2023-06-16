import {Component, Input, OnInit} from '@angular/core';
import {IPost} from "../../interfaces/news";
import {ActivatedRoute, Router} from "@angular/router";
import {UsersService} from "../../services/users.service";
import {IUser} from "../../interfaces/user";
import {WebsocketService} from "../../services/websocket.service";


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit{
  news: Array<IPost>;

  description: string;
  date: string;

  @Input() photo: string;
  @Input() name: string;
  @Input() userID: number;
  activeUserId: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService,
    private router: Router,
    private socketService: WebsocketService,
  ) {

  }

  ngOnInit(): void {

    this.usersService.getNews(this.userID).subscribe((news) => {
      this.news = news;
      for(let post of this.news){
        let date = new Date(post.time);
        post.prettyDate = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()} ${date.toLocaleTimeString()}`;
      }
      this.news.sort(function(a,b){
        // @ts-ignore
        return new Date(b.time) - new Date(a.time);
      });
    });

    // @ts-ignore
    this.activeUserId = JSON.parse(sessionStorage.getItem('user')).id;
    console.log(this.userID);
    console.log(this.activeUserId);
  }

  onStore(elem: IPost){
    this.news.unshift(elem);
  }
  sendPost(){
    let body = {
      id: this.userID,
      description: this.description,
      time: new Date(),
      prettyDate: ''
    };

    //@ts-ignore
    let post: IPost = {};
    this.usersService.createPost(body).subscribe(()=> {
      post.id = this.userID;
      post.time = body.time.toString();
      console.log(post.time);
      post.description = body.description;
      let date = new Date(post.time);
      post.prettyDate = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()} ${date.toLocaleTimeString()}`;
      this.usersService.getUser(this.userID).subscribe((user)=>{
        post.author = user;
        this.onStore(post);
        this.socketService.emitToServer('message', post);
      })

      this.description='';

    });

  }
}
