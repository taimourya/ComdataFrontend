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
      if(this.page  >= this.totalPages) {
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
      tinactiviteMs: form.value['tinactiviteMs'],
      tfermetureSessionMs: form.value['tfermetureSessionMs']
    }).subscribe(data => {
      console.log(data);
      this.messageSuccess = 'activiter ajouter avec succes';
      this.getData();
    }, error => {
      this.messageFailed = "impossible d'ajouter l'activiter";
      console.log('error add activite-list');
      console.log(error);
    });
  }

  onEnable(id: number){

    this.adminService.enableActivite(id).subscribe(data => {
      this.getData();
    });
  }

  onDisable(id: number) {
    this.adminService.disableActivite(id).subscribe(data => {
      this.getData();
    });
  }

  closeMessage() {
    this.messageSuccess = '';
    this.messageFailed = '';
  }
  onFilterChange() {
    this.getData();
  }

  onPageClick(page: number) {
    this.page = page;
    this.getData();
  }

  onPageNext() {
    if(this.page < this.totalPages - 1)
      this.page++;
    this.getData();
  }

  onPagePrevious() {
    if(this.page > 0) {
      this.page--;
      this.getData();
    }
  }

}
