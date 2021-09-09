import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  userData: any = {
    'firstname': '',
    'lastname': '',
    'email': '',
    'phone': '',
    'cin': '',
    'adresse': '',
    'date_naissance': '',
    'passwd': '',
    'confirmPasswd': '',
    'roleName': 'admin',
  }

  role:string="admin";
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    console.log(form);
  }

}
