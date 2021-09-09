import { Component, OnInit } from '@angular/core';
import {NavToggleService} from "../../../services/nav-toggle.service";
import {AccountService} from "../../../services/account.service";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {


  role: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

    this.authService.afterSetRole.subscribe(role => {
      this.role = role;
    });

  }

}
