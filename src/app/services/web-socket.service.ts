import { Injectable } from '@angular/core';
import {Api} from "../constants/api.constant";
import {AuthService} from "./auth.service";
import {webSocket} from "rxjs/webSocket";
import {BehaviorSubject, Subject, Subscriber, timer} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private desktopSocketUri: string = 'ws://localhost:8085';

  private websocketApi: any;
  private websocketDesktop: any;

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

  private emitTempsToDesktop() {
    if(this.websocketDesktop != null) {
      this.websocketDesktop.send("count :" + this.tActif + ','+ this.tPause + ',' + this.tInactif);
    }
  }

  public sendTypesPauseToDesktopSocket(types: any) {
    let msg: string = "types = ";
    for(let i = 0; i < types.length; i++) {
      msg += types[i].libelle + ":" + types[i].id;
      if(i < types.length -1) {
        msg += ",";
      }
    }
    this.websocketDesktop.send(msg);
  }
  private startSocketDesktop(types: any) {
    console.log('starting desktop ...');
    let websocket = new WebSocket(this.desktopSocketUri);

    this.websocketDesktop = websocket;
    this.websocketDesktop.onerror = () => {
      //si l'application desktop n'est pas demarer
      //on utilise les evenements javascript comme secours
      this.listenInactiviter();
    }
    this.websocketDesktop.onopen = () => {
      console.log('started desktop !');
      this.resetTemps();
      this.sendTypesPauseToDesktopSocket(types)
    }

    this.websocketDesktop.onclose = () => {
      //si l'application desktop a été fermer
      //on utilise les evenements javascript comme secours
      this.listenInactiviter();
    }
    this.websocketDesktop.onmessage = (event: { data: string; }) => {
      console.log('from desktop : ' + event.data);
      if(event.data === 'move') {
        if(this.counterInactivite > 0) {
          this.resetTemps();
        }
      }
      else if(event.data.startsWith("pause")) {
        let value: number = parseInt(event.data.split(":")[1].trim());
        this.startPause(value);
      }
      else if(event.data === "stopPause") {
        this.endPause();
      }
    }

  }
  public start(types: any) {
    if(!this.isOpen) {

      let websocket = new WebSocket(Api.ws+'/ws');
      this.websocketApi = websocket;
      this.websocketApi.onopen = () => {
        let token = this.authService.getToken();
        this.websocketApi.send("start : " + token);
      };

      this.websocketApi.onmessage = (event: { data: string; }) => {
        if(event.data.startsWith('count :')) {
          let splited = event.data.split(':');
          let valeur = splited[1].trim();
          let tmps = valeur.split(',');
          this.tActif = parseInt(tmps[0].trim());
          this.tPause = parseInt(tmps[1].trim());
          this.tInactif = parseInt(tmps[2].trim());
          //console.log(this.tActif + " : " + this.tPause + " : " + this.tInactif);
          this.emitTempsSubject();
          this.emitTempsToDesktop();
        }
        else if(event.data === 'success jwt') {
          this.isOpen = true;
          this.startSocketDesktop(types);
          //this.listenInactiviter();
        }
        else if(event.data === 'failed jwt') {
          this.websocketApi.close();
        }
        else {
          console.log('got message : ' + event.data);
        }
      };
      this.websocketApi.onclose = () => {
        this.stopTemps();
        this.isOpen = false;
        this.isClosed.next(true);
        this.websocketDesktop.close();
      }
    }
  }

  public startPause(typePause: number) {
    this.websocketApi.send('state : start/pause?id='+typePause);
  }

  public endPause() {
    this.websocketApi.send('state : end/pause');
  }

  public startInactif() {
    this.websocketApi.send('state : start/inactif');
  }

  public endInactif() {
    this.websocketApi.send('state : end/inactif');
  }

  public endSession() {
    if(this.isOpen)
      this.websocketApi.send('state : end/session');
  }

  private listenInactiviter() {
    this.resetTemps();
    window.ontouchstart = () => {
      if(this.counterInactivite > 0) {
        this.resetTemps();
      }
    };
    window.onclick = () => {
      if(this.counterInactivite > 0) {
        this.resetTemps();
      }
    };
    window.onkeypress = () => {
      if(this.counterInactivite > 0) {
        this.resetTemps();
      }
    };
    window.onmousemove = () => {
      if(this.counterInactivite > 0) {
        this.resetTemps();
      }
    };
    window.onmousedown = () => {
      if(this.counterInactivite > 0) {
        this.resetTemps();
      }
    };
  }

  private stopTemps() {
    clearInterval(this.timer);
  }
  private resetTemps()
  {
    //sendMessage("active");
    if(this.isOpen) {
      if(this.timer != null) {
        clearInterval(this.timer);
      }
      this.counterInactivite = 0;
      this.websocketApi.send('state : inactif?cpt=0');
      console.log('reset (coll active)');
      this.timer = setInterval(() => {
          console.log('counter inactivite : ' + this.counterInactivite);
          this.websocketApi.send('state : inactif?cpt='+this.counterInactivite);
          this.counterInactivite++;
      }, 1000);
    }
  }

}
