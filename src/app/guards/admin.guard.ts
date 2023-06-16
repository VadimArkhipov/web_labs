import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {IUser} from "../interfaces/user";
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate{

  constructor(
    private authService: AuthService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean {
    return this.authService.isAdmin();
  }
}
