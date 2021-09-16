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


  constructor(private authService : AuthService,
              private webSocketService: WebSocketService) { }

  changeStatus(value:boolean){
      this.loggedIn.next(value);
      if(value) {
        this.authService.fetchProfil().subscribe(data => {
          console.log(data);
          let datan : any = data;
          this.userRole.next(datan.roleName);
          this.authService.setRole(datan.roleName);
          this.fullname.next(datan.fullName);
          this.matricule.next(datan.matricule);
          this.image.next(datan.imageUri);
        }, err => {
          console.log(err);
        });
    }
  }


}
