import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {RouterOutlet} from "@angular/router";
import { HeaderComponent } from './components/header/header.component';
import { PaskudaComponent } from './components/paskuda/paskuda.component';
import {AppRoutingModule} from "./app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import { UsersComponent } from './components/users/users.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { FriendsComponent } from './components/friends/friends.component';
import { NewsComponent } from './components/news/news.component';
import { FriendsNewsComponent } from './components/friends-news/friends-news.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import {FormsModule} from "@angular/forms";
import { UserCreateComponent } from './components/user-create/user-create.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import {WebsocketService} from "./services/websocket.service";






@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PaskudaComponent,
    UsersComponent,
    UserProfileComponent,
    FriendsComponent,
    NewsComponent,
    FriendsNewsComponent,
    UserEditComponent,
    UserCreateComponent,
    LoginComponent,
    RegistrationComponent,
  ],
    imports: [
        BrowserModule,
        RouterOutlet,
        AppRoutingModule,
        HttpClientModule,
        FormsModule
    ],
  providers: [WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
