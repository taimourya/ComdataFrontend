import { Injectable, NgModule } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class Api {
  public static host:String = "http://localhost:8080";
  public static ws:String = "ws://localhost:8080";
}