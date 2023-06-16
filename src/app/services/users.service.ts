import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IUser} from "../interfaces/user";
import {IPost} from "../interfaces/news";


const api = 'https://127.0.0.1:7000';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${api}/users`);
  }

  getUser(id: number): Observable<IUser> {
    return this.http.get<IUser>(`${api}/users/${id}`);
  }

  getFriends(id: number): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${api}/users/${id}/friends`);
  }

  getNews(id: number): Observable<IPost[]> {
    return this.http.get<IPost[]>(`${api}/users/${id}/news`);
  }

  getUsersNews(id:number): Observable<IPost[]>{
    return this.http.get<IPost[]>(`${api}/users/${id}/news`);
  }

  getFriendsNews(id:number): Observable<IPost[]>{
    return this.http.get<IPost[]>(`${api}/users/${id}/friends/news`);
  }

  updateUser(body: any){
    return this.http.patch(`${api}/users/${body.id}`, body);
  }

  deleteUser(id:number): Observable<any>{
    return this.http.delete<any>(`${api}/users/${id}`);
  }

  addNewUser(body: any){
    return this.http.post(`${api}/users`, body);
  }

  storeUserImage(userId: number, data: any) {
    return this.http.post(`${api}/users/${userId}/upload-photo`, data);
  }

  deletePhoto(id:Number){
    return this.http.delete(`${api}/users/${id}/delete-photo`);
  }

  createPost(data:any){
    return this.http.post(`${api}/users/${data.id}/create-post`, data);
  }
}
