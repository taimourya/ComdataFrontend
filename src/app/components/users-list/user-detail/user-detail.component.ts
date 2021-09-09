import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  id: number = 0;

  editMode: boolean = false;

  userData: any = {
    'matricule': 'BE13000fvd',
    'firstname': 'yahya',
    'lastname': 'taimourya',
    'email': 'taimouriya@gmail.com',
    'phone': '0643334135',
    'cin': 'BE902884',
    'passwd': '',
    'confirmPasswd': '',
    'adresse': 'sidi el bernoussi hay el qods',
    'date_naissance': '1998-11-19',
    'date_creation': '1998-11-19',
    'isActive': false,
    'roleName': 'admin',
  }

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['userId']

  }

  onClickEdit() {
    this.editMode = !this.editMode;
  }

}
