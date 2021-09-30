import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {AuthService} from "./auth.service";
import {WebSocketService} from "./web-socket.service";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private loggedIn = new BehaviorSubject<boolean>(this.authService.isAuth());
  private userRole = new BehaviorSubject<string>('');
  private fullname = new BehaviorSubject<string>('');
  private matricule = new BehaviorSubject<string>('');
  private image = new BehaviorSubject<string>('');
  authStatus = this.loggedIn.asObservable();
  roleStatus = this.userRole.asObservable();
  fullNameStatus = this.fullname.asObservable();
  matriculeStatus = this.matricule.asObservable();
  imageStatus = this.image.asObservable();


  constructor(private authService : AuthService) { }

  changeStatus(value:boolean){
      if(value) {
        this.authService.fetchProfil().subscribe(data => {
          console.log(data);
          this.startAccount(data);
        }, err => {
          this.stopAccount();
          console.log(err);
        });
    }
    else {
      this.stopAccount();
    }
  }

  private startAccount(data: any) {
    this.loggedIn.next(true);
    this.userRole.next(data.roleName);
    this.authService.setRole(data.roleName);
    this.fullname.next(data.fullName);
    this.matricule.next(data.matricule);
    this.image.next(data.imageUri);
  }

  private stopAccount() {
    this.authService.setToken(null);
    this.authService.setRole('');
    this.userRole.next('');
    this.fullname.next('');
    this.matricule.next('');
    this.image.next('');
    this.loggedIn.next(false);
  }




}
