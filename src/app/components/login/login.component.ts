import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {AccountService} from "../../services/account.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hasError: boolean = false;

  constructor(private authService: AuthService,
              private accountService: AccountService,
              private route: Router) { }

  ngOnInit(): void {

  }

  onSubmit(form: NgForm) {
    console.log(form);
    this.authService.login(form.value['matricule'], form.value['password']).subscribe(resp => {
      console.log(resp);
      this.authService.setToken(resp.headers.get('Authorization'));
      this.accountService.changeStatus(true);
      this.route.navigateByUrl("/");
      //this.webSocketService.start();
    }, err => {
      console.log(err);
      this.hasError = true;
    });
  }

}
