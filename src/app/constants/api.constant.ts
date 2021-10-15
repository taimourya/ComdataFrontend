import { Injectable, NgModule } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class Api {
  public static host:String = "http://192.168.8.104/api";
  public static ws:String = "ws://192.168.8.104/ws";

  //public static host:String = "http://localhost:8080/ComdataPointage-0.0.1-SNAPSHOT";
  //public static ws:String = "ws://localhost:8080/ComdataPointage-0.0.1-SNAPSHOT";
}
