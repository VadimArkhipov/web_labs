import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IUser} from "../interfaces/user";

const api = ' https://127.0.0.1:7000';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any

  constructor(private http: HttpClient) {
  }

  login(data: { email: string }): Observable<IUser> {
    console.log('Паскуда');
    return this.http.post<IUser>(`${api}/users/login`, data);
  }

  isAdmin(): boolean{
    this.user = sessionStorage.getItem('user');

    if(this.user){
      this.user = JSON.parse(this.user);
      return this.user.role === 'admin';
    }
    return false;
  }
}
