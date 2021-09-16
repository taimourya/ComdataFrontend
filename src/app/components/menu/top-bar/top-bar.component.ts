import {Component, OnInit, Output} from '@angular/core';
import {SearchService} from "../../../services/search.service";
import {NavToggleService} from "../../../services/nav-toggle.service";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {AccountService} from "../../../services/account.service";
import {WebSocketService} from "../../../services/web-socket.service";
import {Api} from "../../../constants/api.constant";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  role: string | null = '';
  fullname: string = '';
  matricule: string = '';
  imageUri: string = '';

  constructor(private searchService: SearchService,
              private navToggleService: NavToggleService,
              private authService: AuthService,
              private accountService: AccountService,
              private route: Router,
              private webSocketService: WebSocketService) { }

  ngOnInit(): void {
    this.authService.afterSetRole.subscribe(role => {
      this.role = role;
    });

    this.accountService.fullNameStatus.subscribe(fullname => {
      this.fullname = fullname;
    });

    this.accountService.matriculeStatus.subscribe(matricule => {
      this.matricule = matricule;
    })

    this.accountService.imageStatus.subscribe(image => {
      this.imageUri = image;
    });
  }


  onSearchChangeEmit(mc: string) {
    this.searchService.onChange(mc);
  }

  toggleNav() {
    this.navToggleService.toggle();
  }

  onLogout() {
    if(this.role == 'collaborateur') {
      this.webSocketService.endSession();
    }
    this.authService.setToken(null);
    this.accountService.changeStatus(false);
    this.route.navigateByUrl("/login");
  }



}
