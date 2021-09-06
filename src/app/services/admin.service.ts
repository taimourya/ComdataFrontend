import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Api} from "../constants/api.constant";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient, private authService:AuthService) { }

  private httpHeader() {
    let token = this.authService.getToken();
    return new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': token!
    });
  }

  public fetchUsers(mc: string, typeUser: string, etatCmpt: string, filterSession: string, activite_id: number, page: number, size: number) {
    return this.http.get(Api.host + '/admin/users' +
      '?mc=' + mc +
      '&typeUser=' + typeUser +
      '&filterEtatCmpt=' + etatCmpt +
      '&filterSession=' + filterSession+
      '&activite_id=' + activite_id +
      '&page=' + page +
      '&size=' + size, {
      headers: this.httpHeader()
    });
  }

  public fetchUser(matricule: string) {
    return this.http.get(Api.host + '/admin/user' +
      '?matricule=' + matricule, {
      headers: this.httpHeader()
    });
  }

  public saveUser(form: any) {
    return this.http.post(Api.host + '/admin/user', {
        form
      }, {
      headers: this.httpHeader()
    });
  }

  public editUser(matricule: string, form: any) {
    return this.http.put(Api.host + '/admin/user' +
      '?matricule'+matricule, {
      form
    }, {
      headers: this.httpHeader()
    });
  }
  public enableUser(matricule: string) {
    return this.http.put(Api.host + '/admin/user/enable' +
      '?matricule'+matricule, {}, {
      headers: this.httpHeader()
    });
  }
  public disableUser(matricule: string) {
    return this.http.put(Api.host + '/admin/user/disable' +
      '?matricule'+matricule, {}, {
      headers: this.httpHeader()
    });
  }

  public getActivites(mc: string, page: number, size: number) {
    return this.http.get(Api.host + '/admin/activites' +
      '?mc=' + mc +
      '&page=' + page +
      '&size=' + size, {
      headers: this.httpHeader()
    });
  }

  public getActivite(id: string) {
    return this.http.get(Api.host + '/admin/activite' +
      '?id=' + id, {
      headers: this.httpHeader()
    });
  }

  public saveActivite(form: any) {
    return this.http.post(Api.host + '/admin/activite', {
      form
    }, {
      headers: this.httpHeader()
    });
  }

  public editActivite(id: number, form: any) {
    return this.http.put(Api.host + '/admin/activite' +
      '?id'+id, {
      form
    }, {
      headers: this.httpHeader()
    });
  }

  public enableActivite(id: number) {
    return this.http.put(Api.host + '/admin/activite/enable' +
      '?id'+id, {}, {
      headers: this.httpHeader()
    });
  }
  public disableActivite(id: number) {
    return this.http.put(Api.host + '/admin/activite/disable' +
      '?id'+id, {}, {
      headers: this.httpHeader()
    });
  }

}
