import { Injectable, NgModule } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class Api {
  public static host:String = "http://localhost/api";
  public static ws:String = "ws://localhost/ws";

  //public static host:String = "http://localhost:8080/ComdataPointage-0.0.1-SNAPSHOT";
  //public static ws:String = "ws://localhost:8080/ComdataPointage-0.0.1-SNAPSHOT";
}
