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
      '&activiter_id=' + activite_id +
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
    return this.http.post(Api.host + '/admin/user', form, {
      headers: this.httpHeader()
    });
  }

  public editUser(matricule: string, form: any) {
    return this.http.put(Api.host + '/admin/user' +
      '?matricule='+matricule, form, {
      headers: this.httpHeader()
    });
  }
  public enableUser(matricule: string) {
    return this.http.put(Api.host + '/admin/user/enable' +
      '?matricule='+matricule, {}, {
      headers: this.httpHeader()
    });
  }
  public disableUser(matricule: string) {
    return this.http.put(Api.host + '/admin/user/disable' +
      '?matricule='+matricule, {}, {
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

  public getActivite(id: number) {
    return this.http.get(Api.host + '/admin/activite' +
      '?id=' + id, {
      headers: this.httpHeader()
    });
  }

  public saveActivite(form: any) {
    return this.http.post(Api.host + '/admin/activite', form, {
      headers: this.httpHeader()
    });
  }

  public editActivite(id: number, form: any) {
    return this.http.put(Api.host + '/admin/activite?id='+id, form, {
      headers: this.httpHeader()
    });
  }

  public enableActivite(id: number) {
    return this.http.put(Api.host + '/admin/activite/enable' +
      '?id='+id, {}, {
      headers: this.httpHeader()
    });
  }
  public disableActivite(id: number) {
    return this.http.put(Api.host + '/admin/activite/disable' +
      '?id='+id, {}, {
      headers: this.httpHeader()
    });
  }

  public fetchTempsCollaborateur(matricule: string) {
    return this.http.get(Api.host + '/admin/collaborateur/temps' +
      '?matricule=' + matricule, {
      headers: this.httpHeader()
    });
  }

  public fetchStatistiquesCollaborateur(matricule: string, paramTime: string, from: Date, to: Date) {
    return this.http.get(Api.host + '/admin/collaborateur/stats' +
      '?matricule=' + matricule +
      '&paramTime=' + paramTime +
      '&from=2020-08-01' +
      '&to=2021-10-10', {
      headers: this.httpHeader()
    });
  }

  public fetchStatistiquesByActivite(id: number, paramTime: string, from: Date, to: Date) {
    return this.http.get(Api.host + '/admin/activiter/stats' +
      '?id=' + id +
      '&paramTime=' + paramTime +
      '&from=' + from +
      '&to=' + to, {
      headers: this.httpHeader()
    });
  }

  public fetchStatistiquesPieByActivite(id: number, from: Date, to: Date) {
    return this.http.get(Api.host + '/admin/activiter/stats/pie' +
      '?id=' + id +
      '&from=' + from +
      '&to=' + to, {
      headers: this.httpHeader()
    });
  }

  public fetchTypes(mc: string, page: number, size: number) {
    return this.http.get(Api.host + '/admin/types' +
      '?mc=' + mc +
      '&page=' + page +
      '&size=' + size, {
      headers: this.httpHeader()
    });
  }

  public saveType(form: any) {
    return this.http.post(Api.host + '/admin/type', form, {
      headers: this.httpHeader()
    });
  }

  public editType(id: number, form: any) {
    return this.http.put(Api.host + '/admin/type?id='+id, form, {
      headers: this.httpHeader()
    });
  }

  public deleteType(id: number) {
    return this.http.delete(Api.host + '/admin/type' +
      '?id='+id, {
      headers: this.httpHeader()
    });
  }

  public fetchLienGenerationUsers() {
    return this.http.get(Api.host + '/admin/download/users/excel', {
      responseType: 'text',
      headers: this.httpHeader()
    });
  }

  public fetchLienGenerationActivites() {
    return this.http.get(Api.host + '/admin/download/activites/excel', {
      responseType: 'text',
      headers: this.httpHeader()
    });
  }

  public fetchLienGenerationTypes() {
    return this.http.get(Api.host + '/admin/download/types/excel', {
      responseType: 'text',
      headers: this.httpHeader()
    });
  }

  public fetchLienGenerationTemps() {
    return this.http.get(Api.host + '/admin/download/temps/excel', {
      responseType: 'text',
      headers: this.httpHeader()
    });
  }

  importExcel(fileActivites: File, fileUsers: File, fileTypes: File, fileTemps: File) {
    const data: FormData = new FormData();
    data.append('fileActivites', fileActivites);
    data.append('fileUsers', fileUsers);
    data.append('fileTypes', fileTypes);
    data.append('fileTemps', fileTemps);
    return this.http.post(Api.host + '/admin/import/excel', data, {
      headers: this.httpHeader()
    });
  }

  startDownloadExcelFile(uri: string) {
    return this.http.get(uri, {
      observe: 'response',
      responseType: 'blob' as 'json',
      headers: this.httpHeader()
    });
  }
}
