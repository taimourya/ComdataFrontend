import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "./auth.service";
import {AccountService} from "./account.service";

@Injectable({
  providedIn: 'root'
})
export class AfterAuthGuard implements CanActivate {

  constructor(private authService: AuthService, private route: Router , private accountService : AccountService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    if(this.authService.isAuth()) {
      this.route.navigateByUrl("/")
      this.accountService.changeStatus(true);
      return false;
    }


    return true;

  }

}
