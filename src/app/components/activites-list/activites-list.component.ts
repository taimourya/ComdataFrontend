import { Component, OnInit } from '@angular/core';
import {SearchService} from "../../services/search.service";
import {AdminService} from "../../services/admin.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-activites-list',
  templateUrl: './activites-list.component.html',
  styleUrls: ['./activites-list.component.css']
})
export class ActivitesListComponent implements OnInit {

  totalPages: number = 5;
  page: number = 0;
  size: number = 8;

  addMode: boolean = false;

  activites: any = [];

  mc: string = '';
  isLoading: boolean = false;

  messageSuccess: string = '';
  messageFailed: string = '';

  temps1: number = 1;
  temps2: number = 1;

  constructor(
    private searchService: SearchService,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {

    this.getData();
    this.searchService.searchSubject.subscribe(mc => {
      this.mc = mc;
      this.getData();
    });
  }

  getData() {
    this.isLoading = true;
    this.adminService.getActivites(this.mc, this.page, this.size).subscribe(data => {
      let datan: any = data;
      this.activites = datan.content;
      this.totalPages = datan.totalPage;
      if(this.totalPages != 0 && this.page  >= this.totalPages) {
        this.page = 0;
        this.getData();
      }
      this.isLoading = false;
    }, error => {
      console.log('error on activite list');
      console.log(error);
    });
  }

  onCancelAdd() {
    this.addMode = false;
  }

  onStartAdd() {
    this.addMode = true;
  }

  onSubmitAdd(form: NgForm) {
    console.log("submited");
    console.log(form);
    console.log(form.value['name']);
    this.adminService.saveActivite({
      name: form.value['name'],
      tinactiviteMs: form.value['tinactiviteMs'] * this.temps1,
      tfermetureSessionMs: form.value['tfermetureSessionMs'] * this.temps2
    }).subscribe(data => {
      console.log(data);
      this.getData();
      this.showSuccess('activiter ajouter avec succes');
    }, error => {
      this.showError('impossible d\'ajouter l\'activiter');
    });
  }

  onEnable(id: number){
    if(confirm('etes vous sur de vouloir continuer?')) {
      this.adminService.enableActivite(id).subscribe(data => {
        this.getData();
        this.showSuccess('activation effctu??');
      });
    }
  }

  onDisable(id: number) {
    if(confirm('etes vous sur de vouloir continuer?')) {
      this.adminService.disableActivite(id).subscribe(data => {
        this.getData();
        this.showSuccess('desactivation effctu??');
      });
    }
  }

  closeMessage() {
    this.messageSuccess = '';
    this.messageFailed = '';
  }

  showSuccess(msg: string) {
    this.messageSuccess = msg;
    this.messageFailed = '';
  }

  showError(msg: string) {
    this.messageSuccess = '';
    this.messageFailed = msg;
  }

  onFilterChange() {
    this.getData();
  }

  onPageClick(page: number) {
    this.page = page;
    this.getData();
  }

  onPageNext() {
    if(this.page < this.totalPages - 1) {
      this.page++;
      this.getData();
    }
  }

  onPagePrevious() {
    if(this.page > 0) {
      this.page--;
      this.getData();
    }
  }

  onChangeTemps(temps: string, source: number) {

    if(temps === 'ms') {
      if(source === 1) {
        this.temps1 = 1;
      }
      else if(source === 2) {
        this.temps2 = 1;
      }
    }
    else if(temps === 's') {
      if(source === 1) {
        this.temps1 = 1000;
      }
      else if(source === 2) {
        this.temps2 = 1000;
      }
    }
    else if(temps === 'm') {
      if(source === 1) {
        this.temps1 = 1000 * 60;
      }
      else if(source === 2) {
        this.temps2 = 1000 * 60;
      }
    }

  }

}
