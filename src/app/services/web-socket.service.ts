import { Injectable } from '@angular/core';
import {Api} from "../constants/api.constant";
import {AuthService} from "./auth.service";
import {webSocket} from "rxjs/webSocket";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {


  private websocket: any;

  tempsSubject = new Subject<any>();

  private isOpen: boolean = false;
  private tActif: number = 0;
  private tPause: number = 0;
  private tInactif: number = 0;

  constructor(private authService: AuthService) {

  }

  private emitTempsSubject() {
    this.tempsSubject.next({
      tActif: this.tActif,
      tPause: this.tPause,
      tInactif: this.tInactif
    });
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
        console.log(this.tActif + " : " + this.tPause + " : " + this.tInactif);
        this.emitTempsSubject();
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
