import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private route: Router,
              private authService: AuthService) { }

  ngOnInit(): void {

    let subs  = this.authService.afterSetRole.subscribe(role => {
      if(role === 'collaborateur') {
        this.route.navigateByUrl("/home/collaborateur");
        subs.unsubscribe();
      }
      else if(role === 'admin' || role === 'superviseur') {
        this.route.navigateByUrl("/home");
        subs.unsubscribe();
      }
      else {
        this.route.navigateByUrl("/login");
        subs.unsubscribe();
      }
    });

  }

}
