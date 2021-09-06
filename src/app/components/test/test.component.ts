import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {compareSegments} from "@angular/compiler-cli/src/ngtsc/sourcemaps/src/segment_marker";
import {WebSocketService} from "../../services/web-socket.service";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private webSocketService: WebSocketService) { }

  ngOnInit(): void {
    this.authService.login("matcolcol1UBER", "123").subscribe(resp => {
      console.log(resp);
      this.authService.setToken(resp.headers.get('Authorization'));

      this.webSocketService.start();

    }, error => {
      console.log(error);
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
