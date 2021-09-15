import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../services/account.service";
import {Router} from "@angular/router";
import {WebSocketService} from "../../services/web-socket.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-home-collaborateur',
  templateUrl: './home-collaborateur.component.html',
  styleUrls: ['./home-collaborateur.component.css']
})
export class HomeCollaborateurComponent implements OnInit {


  temps: any = {};

  selectedType : number = 1;

  types: any = [];

  messageSuccess: string = '';
  messageFailed: string = '';


  constructor(private accountService: AccountService,
              private authService: AuthService,
              private route: Router,
              private webSocketService: WebSocketService) { }

  ngOnInit(): void {
    this.webSocketService.start();

    this.webSocketService.tempsSubject.subscribe(temps => {
      this.temps = temps;
    });

    this.authService.fetchPauses().subscribe(data => {
      let datan: any = data;
      this.types = datan.content;
    });

    let sub = this.webSocketService.isClosedSubject.subscribe(isClosed => {
      if(isClosed) {
        this.logout();
        this.webSocketService.isClosed.next(false);
        sub.unsubscribe();
      }
    });
  }

  onPause() {
    if(this.temps.tPause > 0) {
      this.messageFailed = 'vous ete deja en pause';
    }
    else {
      this.messageSuccess = 'opération effectué';
      this.webSocketService.startPause(this.selectedType);
    }
  }
  onPauseEnd() {
    this.webSocketService.endPause();
  }

  logout() {
    this.authService.setToken(null);
    this.authService.setRole('');
    this.accountService.changeStatus(false);
    this.route.navigateByUrl("/login/" + 'votre session a été fermé');
  }

  closeMessage() {
    this.messageSuccess = '';
    this.messageFailed = '';
  }

}
