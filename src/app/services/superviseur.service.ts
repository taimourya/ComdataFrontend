import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Api} from "../constants/api.constant";

@Injectable({
  providedIn: 'root'
})
export class SuperviseurService {

  constructor(private http:HttpClient, private authService:AuthService) { }

  private httpHeader() {
    let token = this.authService.getToken();
    return new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': token!
    });
  }

  public fetchCollaborateurs(mc: string, etatCmpt: string, filterSession: string, page: number, size: number) {
    return this.http.get(Api.host + '/superviseur/collaborateurs' +
      '?mc=' + mc +
      '&filterEtatCmpt=' + etatCmpt +
      '&filterSession=' + filterSession+
      '&page=' + page +
      '&size=' + size, {
      headers: this.httpHeader()
    });
  }

  public fetchCollaborateur(matricule: string) {
    return this.http.get(Api.host + '/superviseur/collaborateur' +
      '?matricule=' + matricule, {
      headers: this.httpHeader()
    });
  }

  public saveCollaborateur(form: any) {
    return this.http.post(Api.host + '/superviseur/collaborateur', {
      form
    }, {
      headers: this.httpHeader()
    });
  }

  public editCollaborateur(matricule: string, form: any) {
    return this.http.put(Api.host + '/superviseur/collaborateur' +
      '?matricule'+matricule, {
      form
    }, {
      headers: this.httpHeader()
    });
  }
  public enableCollaborateur(matricule: string) {
    return this.http.put(Api.host + '/superviseur/collaborateur/enable' +
      '?matricule'+matricule, {}, {
      headers: this.httpHeader()
    });
  }
  public disableCollaborateur(matricule: string) {
    return this.http.put(Api.host + '/superviseur/collaborateur/disable' +
      '?matricule'+matricule, {}, {
      headers: this.httpHeader()
    });
  }

  public editParametrage(tfermetureSessionMs: number, tinactiviteMs: number) {
    return this.http.put(Api.host + '/superviseur/activiter/parametrage', {
      "tfermetureSessionMs": tfermetureSessionMs,
      "tinactiviteMs": tinactiviteMs
    }, {
      headers: this.httpHeader()
    });
  }

  public fetchTempsCollaborateur(matricule: string) {
    return this.http.get(Api.host + '/superviseur/collaborateur/temps' +
      '?matricule=' + matricule, {
      headers: this.httpHeader()
    });
  }

}
