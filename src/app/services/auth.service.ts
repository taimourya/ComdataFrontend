import { Injectable } from '@angular/core';
import {Api} from "../constants/api.constant";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  afterSetRole = new Subject<string>();

  constructor(private http:HttpClient) { }

  isAuth() {
    return this.getToken() != 'null';
  }

  getToken() {
    return localStorage.getItem('token');
  }

  setToken(token: any) {
    if(token == null)
      localStorage.removeItem('token');
    localStorage.setItem('token', token);
  }

  getRole() {
    return localStorage.getItem('role');
  }

  setRole(role: string) {
    this.afterSetRole.next(role);
    localStorage.setItem('role', role);
  }



  login(matricule: string, password: string) {
    return this.http.post(Api.host + "/login",
      {
        'matricule': matricule,
        'password': password
      },
      {
        observe: 'response',
        headers: new HttpHeaders({
          'Accept': 'application/json'
        })
      }
    );
  }

  logout() {
    this.setToken(null);
  }

  fetchProfil() {
    let token = this.getToken();
    return this.http.get(Api.host + '/user/profil', {
      headers: new HttpHeaders({
        'Authorization': token!
      })
    });
  }

  editProfil(form: any) {
    let token = this.getToken();
    return this.http.put(Api.host + '/user/profil/edit', form, {
      headers: new HttpHeaders({
        'Authorization': token!
      })
    });
  }

  fetchPauses() {
    let token = this.getToken();
    return this.http.get(Api.host + '/user/pause/types', {
      headers: new HttpHeaders({
        'Authorization': token!
      })
    });
  }

}
