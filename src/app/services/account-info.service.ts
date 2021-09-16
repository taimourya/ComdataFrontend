import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AccountInfoService {

  matricule: string = '';
  fullname: string = '';
  role: string = '';

  accountSubject = new Subject<any>();

  constructor(private authService: AuthService) {}

  setAccount(matricule: string, fullname: string, role: string) {
    this.matricule = matricule;
    this.fullname = fullname;
    this.role = role;
    this.loadAccount();
  }

  loadAccount() {
    this.accountSubject.next({
      matricule: this.matricule,
      fullname: this.fullname,
      role: this.role
    });
  }

}
