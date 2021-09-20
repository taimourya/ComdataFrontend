import { Component, OnInit } from '@angular/core';
import {SearchService} from "../../services/search.service";
import {AdminService} from "../../services/admin.service";
import {SuperviseurService} from "../../services/superviseur.service";
import {AuthService} from "../../services/auth.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-types-pause-list',
  templateUrl: './types-pause-list.component.html',
  styleUrls: ['./types-pause-list.component.css']
})
export class TypesPauseListComponent implements OnInit {

  totalPages: number = 5;
  page: number = 0;
  size: number = 8;

  addMode: boolean = false;

  types: any = [];

  mc: string = '';
  isLoading: boolean = false;

  messageSuccess: string = '';
  messageFailed: string = '';

  libelle: string = '';

  selectedType: number = 0;

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
    this.adminService.fetchTypes(this.mc, this.page, this.size).subscribe(data => {
      let datan: any = data;
      this.types = datan.content;
      this.totalPages = datan.totalPage;
      if(this.totalPages != 0 && this.page  >= this.totalPages) {
        this.page = 0;
        this.getData();
      }
      this.isLoading = false;
    }, error => {
      console.log('error on type-list');
      console.log(error);
    });
  }

  onCancelAdd() {
    this.libelle = '';
    this.addMode = false;
    this.selectedType = 0;
  }

  onStartAdd() {
    this.addMode = true;
  }

  onSubmitAdd(form: NgForm) {
    if(this.selectedType == 0) {
      this.adminService.saveType({
        libelle: form.value['libelle'],
      }).subscribe(data => {
        console.log(data);
        this.messageSuccess = 'type ajouter avec succes';
        this.getData();
      }, error => {
        this.messageFailed = "impossible d'ajouter le type";
        console.log('error add activite-list');
        console.log(error);
      });
    }
    else {
      this.adminService.editType(this.selectedType, {
        libelle: form.value['libelle'],
      }).subscribe(data => {
        console.log(data);
        this.messageSuccess = 'type ajouter avec succes';
        this.getData();
      }, error => {
        this.messageFailed = "impossible d'ajouter le type";
        console.log('error add activite-list');
        console.log(error);
      });
    }
  }


  onDelete(id: number) {
    if(confirm('etes vous sur de vouloir continuer?')) {
      this.adminService.deleteType(id).subscribe(data => {
        this.getData();
        this.messageSuccess = 'le type a été supprimer';
      }, error => {
        this.messageFailed = 'impossible de supprimer ce type car il est deja utilisé'
      });
    }
  }

  onStartEdit(id: number, libelle: string) {
    this.selectedType = id;
    this.libelle = libelle;
    this.addMode = true;
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


}
