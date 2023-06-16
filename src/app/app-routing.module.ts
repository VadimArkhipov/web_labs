import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HeaderComponent} from "./components/header/header.component";
import {PaskudaComponent} from "./components/paskuda/paskuda.component";
import {AppComponent} from "./app.component";
import {UsersComponent} from "./components/users/users.component";
import {UserProfileComponent} from "./components/user-profile/user-profile.component";
import {FriendsComponent} from "./components/friends/friends.component";
import {FriendsNewsComponent} from "./components/friends-news/friends-news.component";
import {UserEditComponent} from "./components/user-edit/user-edit.component";
import {UserCreateComponent} from "./components/user-create/user-create.component";
import {LoginComponent} from "./components/login/login.component";
import {AuthGuard} from "./guards/auth.guard";
import {AdminGuard} from "./guards/admin.guard";
import {RegistrationComponent} from "./components/registration/registration.component";


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'users', component: UsersComponent, canActivate:[AuthGuard, AdminGuard]},
  {path: 'users/create', component: UserCreateComponent, canActivate:[AuthGuard, AdminGuard]},
  {path: 'users/:id', component: UserProfileComponent, canActivate:[AuthGuard]},
  {path: 'users/:id/friends', component: FriendsComponent, canActivate:[AuthGuard]},
  {path: 'users/:id/friends/news', component: FriendsNewsComponent, canActivate:[AuthGuard]},
  {path: 'users/:id/edit', component: UserEditComponent, canActivate:[AuthGuard]},
  {path: '**', component: PaskudaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

})
export class AppRoutingModule {
}
