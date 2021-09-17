import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../services/admin.service";

@Component({
  selector: 'app-settings-admin',
  templateUrl: './settings-admin.component.html',
  styleUrls: ['./settings-admin.component.css']
})
export class SettingsAdminComponent implements OnInit {

  uriUsers: string = '';
  uriActivites: string = '';
  uriTypes: string = '';
  uriTemps: string = '';

  fileActivites: any;
  fileUsers: any;
  fileTypes: any;
  fileTemps: any;

  messageSuccess: string = '';
  messageFailed: string = '';

  isLoading: boolean = false;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
  }

  onGetUriUsers() {
    this.adminService.fetchLienGenerationUsers().subscribe(uri => {
      this.uriUsers = uri;
    });
  }

  onGetUriActivites() {
    this.adminService.fetchLienGenerationActivites().subscribe(uri => {
      this.uriActivites = uri;
    });
  }

  onGetUriTypes() {
    this.adminService.fetchLienGenerationTypes().subscribe(uri => {
      this.uriTypes = uri;
    });
  }

  onGetUriTemps() {
    this.adminService.fetchLienGenerationTemps().subscribe(uri => {
      this.uriTemps = uri;
    });
  }

  onSubmitImport() {
    this.isLoading = true;
    this.adminService.importExcel(this.fileActivites, this.fileUsers, this.fileTypes, this.fileTemps).subscribe(() => {
      this.isLoading = false;
      this.messageSuccess = "import effectué";
    }, error => {
      this.isLoading = false;
      this.messageFailed = "import a échouer";
    });
  }

  onChangeFileUsers(event: any) {
    this.fileUsers = event.target.files[0];
  }

  onChangeFileActivites(event: any) {
    this.fileActivites = event.target.files[0];
  }

  onChangeFileTypes(event: any) {
    this.fileTypes = event.target.files[0];
  }

  onChangeFileTemps(event: any) {
    this.fileTemps = event.target.files[0];
  }

  closeMessage() {
    this.messageSuccess = '';
    this.messageFailed = '';
  }


}
