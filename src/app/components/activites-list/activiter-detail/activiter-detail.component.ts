import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AdminService} from "../../../services/admin.service";

@Component({
  selector: 'app-activiter-detail',
  templateUrl: './activiter-detail.component.html',
  styleUrls: ['./activiter-detail.component.css']
})
export class ActiviterDetailComponent implements OnInit {

  id: number = 0;

  editMode: boolean = false;

  data: any = {};

  messageSuccess: string = '';
  messageFailed: string = '';

  temps1: number = 1;
  temps2: number = 1;

  isLoading: boolean = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private adminService: AdminService) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id']

    this.getActiviter();
  }

  getActiviter() {
      this.isLoading = true;
      this.adminService.getActivite(this.id).subscribe(data => {
        this.data = data;
        this.isLoading = false;
      }, error => {
        this.router.navigateByUrl("/");
      });
  }

  onClickEdit() {
    this.editMode = !this.editMode;
  }

  onSubmit() {
    this.adminService.editActivite(this.id, {
      name: this.data.nom,
      tfermetureSessionMs: this.data.tfermetureSessionMs * this.temps2,
      tinactiviteMs: this.data.tinactiviteMs * this.temps1
    }).subscribe(data => {
      this.messageSuccess = 'modification effectué';
    }, error => {
      this.messageFailed = 'modification impossible';
      console.log("edit error");
      console.log(error);
    });
  }

  closeMessage() {
    this.messageSuccess = '';
    this.messageFailed = '';
  }

  onChangeTemps(temps: string, source: number) {

    this.data.tinactiviteMs *=  this.temps1;
    this.data.tfermetureSessionMs *=  this.temps2;

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

    this.data.tinactiviteMs /=  this.temps1;
    this.data.tfermetureSessionMs /=  this.temps2;
  }


  onActiver() {
    this.adminService.enableActivite(this.id).subscribe(data => {
      this.getActiviter();
    });
  }

  onDesactiver() {
    this.adminService.disableActivite(this.id).subscribe(data => {
      this.getActiviter();
    });
  }

}
