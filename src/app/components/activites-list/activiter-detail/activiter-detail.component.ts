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

  constructor(private route: ActivatedRoute,
              private router: Router,
              private adminService: AdminService) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id']

    this.getActiviter();
  }

  getActiviter() {
      this.adminService.getActivite(this.id).subscribe(data => {
        this.data = data;
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
      tfermetureSessionMs: this.data.tfermetureSessionMs,
      tinactiviteMs: this.data.tinactiviteMs
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

}
