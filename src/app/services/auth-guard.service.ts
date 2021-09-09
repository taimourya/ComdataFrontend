import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import {AccountService} from "./account.service";


@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {


    constructor(private authService: AuthService, private route: Router , private accountService : AccountService) {}


    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {

        if(!this.authService.isAuth()) {
          this.route.navigateByUrl("/login")
          this.accountService.changeStatus(false)
          return false;
        }

        if(route.data.roles != null) {
          for (let i = 0; i < route.data.roles.length; i++){
            const r: string = route.data.roles[i];
            if(r === this.authService.getRole()) {
              this.accountService.changeStatus(true);
              return true;
            }
          }
        }

        this.accountService.changeStatus(true);
        this.route.navigateByUrl("/403")
        return false;

    }

}
