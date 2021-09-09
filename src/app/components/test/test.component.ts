import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {compareSegments} from "@angular/compiler-cli/src/ngtsc/sourcemaps/src/segment_marker";
import {WebSocketService} from "../../services/web-socket.service";
import {SearchService} from "../../services/search.service";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {


  tActif: number = 0;
  tPause: number = 0;
  tInactif: number = 0;

  temps: any;

  constructor(
    private authService: AuthService,
    private webSocketService: WebSocketService,
    private searchService: SearchService) { }

  ngOnInit(): void {

    this.webSocketService.tempsSubject.subscribe(data => {
      this.temps = data;
    }, err => {
      console.log(err);
    });

    this.authService.login("matcolcol1UBER", "123").subscribe(resp => {
      console.log(resp);
      this.authService.setToken(resp.headers.get('Authorization'));

      this.webSocketService.start();

    }, error => {
      console.log(error);
    });

    this.searchService.searchSubject.subscribe(mc => {
      console.log("subs test : " + mc);
    }, err => {
      console.log(err);
    });
  }

  onStartPause() {
    this.webSocketService.startPause(1);
  }

  onEndPause() {
    this.webSocketService.endPause();
  }

  onStartInactif() {
    this.webSocketService.startInactif();
  }

  onEndInactif() {
    this.webSocketService.endInactif();
  }

}
