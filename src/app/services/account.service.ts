import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private loggedIn = new BehaviorSubject<boolean>(this.authService.isAuth());
  authStatus = this.loggedIn.asObservable();


  constructor(private authService : AuthService) { }

  changeStatus(value:boolean){
    this.loggedIn.next(value)
  }
}
