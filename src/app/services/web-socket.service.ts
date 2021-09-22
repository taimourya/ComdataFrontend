import { Injectable } from '@angular/core';
import {Api} from "../constants/api.constant";
import {AuthService} from "./auth.service";
import {webSocket} from "rxjs/webSocket";
import {BehaviorSubject, Subject, Subscriber, timer} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {


  private websocket: any;

  tempsSubject = new Subject<any>();
  isClosed = new BehaviorSubject<boolean>(false);
  isClosedSubject = this.isClosed.asObservable();

  private isOpen: boolean = false;
  private tActif: number = 0;
  private tPause: number = 0;
  private tInactif: number = 0;

  private counterInactivite: number = 0;
  private timer: any = null;

  constructor(private authService: AuthService) {

  }

  private toTime(tempsSec: number) {
    return new Date(tempsSec * 1000).toISOString().substr(11, 8);
  }

  private emitTempsSubject() {
    this.tempsSubject.next({
      tActif: this.tActif,
      tPause: this.tPause,
      tInactif: this.tInactif,
      timeActif: this.toTime(this.tActif),
      timePause: this.toTime(this.tPause),
      timeInactif: this.toTime(this.tInactif),
    });
  }

  public start() {
    if(!this.isOpen) {

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
          //console.log(this.tActif + " : " + this.tPause + " : " + this.tInactif);
          this.emitTempsSubject();
        }
        else if(event.data === 'success jwt') {
          this.isOpen = true;
          this.listenInactiviter();
        }
        else if(event.data === 'failed jwt') {
          this.websocket.close();
        }
        else {
          console.log('got message : ' + event.data);
        }
      };
      this.websocket.onclose = () => {
        this.stopTemps();
        this.isOpen = false;
        this.isClosed.next(true);
      }
    }
  }

  public startPause(typePause: number) {
    this.websocket.send('state : start/pause?id='+typePause);
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
    if(this.isOpen)
      this.websocket.send('state : end/session');
  }

  private listenInactiviter() {
    window.ontouchstart = () => {
      this.resetTemps();
    };
    window.onclick = () => {
      this.resetTemps();
    };
    window.onkeypress = () => {
      this.resetTemps();
    };
    window.onmousemove = () => {
      this.resetTemps();
    };
    window.onmousedown = () => {
      this.resetTemps();
    };
  }

  private stopTemps() {
    clearInterval(this.timer);
  }
  private resetTemps()
  {
    //sendMessage("active");
    if(this.isOpen) {
      if(this.timer != null)
        clearInterval(this.timer);
      this.counterInactivite = 0;
      this.timer = setInterval(() => {
        //console.log('counter inactivite : ' + this.counterInactivite);
          this.websocket.send('state : inactif?cpt='+this.counterInactivite);
          this.counterInactivite++;
      }, 1000);
    }
  }

}
