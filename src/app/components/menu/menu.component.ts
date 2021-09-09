import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../services/account.service";
import {NavToggleService} from "../../services/nav-toggle.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  navState: boolean = true;
  isAuth: boolean = false;
  role: string | null = '';

  constructor(private accountService: AccountService,
              private authService: AuthService,
              private navToggleService: NavToggleService) { }

  ngOnInit(): void {
    this.accountService.authStatus.subscribe(status => {
      this.isAuth = status;
    });

    this.authService.afterSetRole.subscribe(role => {
      this.role = role;
    });

    this.navToggleService.stateSubject.subscribe(state => {
      this.navState = state;
      console.log(this.navState);
    }, err => {
      console.log(err);
    });
  }

}
