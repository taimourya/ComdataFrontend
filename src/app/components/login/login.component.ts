import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AccountService} from "../../services/account.service";
import {interval} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hasError: boolean = false;

  errorMsg: string = '';

  constructor(private authService: AuthService,
              private accountService: AccountService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.errorMsg = this.route.snapshot.params['msgErr'];
  }

  onSubmit(form: NgForm) {
    console.log(form);
    this.authService.login(form.value['matricule'], form.value['password']).subscribe(resp => {
      console.log(resp);
      this.authService.setToken(resp.headers.get('Authorization'));
      this.accountService.changeStatus(true);
      setTimeout(() => {
        this.router.navigateByUrl("/");
      }, 100);

    }, err => {
      console.log(err);
      if(err.error.message === 'disabled')
        this.errorMsg = 'votre compte est désactiver';
      else {
        this.errorMsg = 'matricule or password incorrect';
      }
    });
  }

}
