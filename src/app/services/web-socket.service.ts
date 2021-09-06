import { Injectable } from '@angular/core';
import {Api} from "../constants/api.constant";
import {AuthService} from "./auth.service";
import {webSocket} from "rxjs/webSocket";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {


  private websocket: any;

  public isOpen: boolean = false;
  public tActif: number = 0;
  public tPause: number = 0;
  public tInactif: number = 0;

  constructor(private authService: AuthService) {

  }

  public start() {
    let websocket = new WebSocket(Api.ws+'/ws');
    this.websocket = websocket;
    this.websocket.onopen = () => {
      let token = this.authService.getToken();
      this.websocket.send("start : " + token);
    };

    this.websocket.onmessage = (event: { data: string; }) => {
      if(event.data.startsWith('count :')) {
        let splited = event.data.split(':');
        let valeur = splited[1].trim();
        let tmps = valeur.split(',');
        this.tActif = parseInt(tmps[0].trim());
        this.tPause = parseInt(tmps[1].trim());
        this.tInactif = parseInt(tmps[2].trim());
        console.log(this.tActif + " : " + this.tPause + " : " + this.tInactif)
      }
      else if(event.data === 'success jwt') {
        this.isOpen = true;
      }
      else if(event.data === 'failed jwt') {
        this.websocket.close();
      }
      else {
        console.log('got message : ' + event.data);
      }
    };
    this.websocket.onclose = () => {
      this.isOpen = false;
    }
  }

  public startPause(typePause: number) {
    this.websocket.send('state : start/pause?id=1');
  }

  public endPause() {
    this.websocket.send('state : end/pause');
  }

  public startInactif() {
    this.websocket.send('state : start/inactif');
  }

  public endInactif() {
    this.websocket.send('state : end/inactif');
  }

  public endSession() {
    this.websocket.send('state : end/session');
  }

  private listenInactiviter() {

  }

}
