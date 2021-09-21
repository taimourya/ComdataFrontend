import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {AdminService} from "../../../services/admin.service";
import {SuperviseurService} from "../../../services/superviseur.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  activites :any = [];

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

  roleForm:string='admin';
  role:string='';


  constructor(private authService: AuthService,
              private adminService: AdminService,
              private superviseurService: SuperviseurService,
              private route: Router) { }

  ngOnInit(): void {
    this.getActivites();
    this.authService.afterSetRole.subscribe(role => {
      this.role = role;
    });

  }

  onSubmit(form: NgForm) {
    if(this.role == 'admin') {
      let body: any = {
        firstname: form.value['prenom'],
        lastname: form.value['nom'],
        email: form.value['email'],
        phone: form.value['phone'],
        cin: form.value['cin'],
        adresse : form.value['adresse'],
        passwd: form.value['passwd'],
        confirmPasswd: form.value['confirmPasswd'],
        date_naissance: form.value['date_naissance'],
        type: this.roleForm,
      }
      if(body.type != 'admin') {
        body.activiter_id = form.value['activiter']
      }
      this.adminService.saveUser(body).subscribe(data => {
        console.log(data);
        let datan: any = data;
        this.route.navigateByUrl('/user/'+datan.matricule);
      }, error => {
        console.log('error lors de la creation user');
        console.log(error);
      })
    }
    else {
      this.superviseurService.saveCollaborateur({
        firstname: form.value['prenom'],
        lastname: form.value['nom'],
        email: form.value['email'],
        phone: form.value['phone'],
        cin: form.value['cin'],
        adresse : form.value['adresse'],
        passwd: form.value['passwd'],
        confirmPasswd: form.value['confirmPasswd'],
        date_naissance: form.value['date_naissance']
      }).subscribe(data => {
        console.log(data);
        let datan: any = data;
        this.route.navigateByUrl('/user/'+datan.matricule);
      }, error => {
        console.log('error lors de la creation user');
        console.log(error);
      })
    }
  }

  getActivites() {
      this.adminService.getActivites('', 0, 100).subscribe(data => {
        let datan: any = data;
        this.activites = datan.content;
      }, error => {
        console.log('error actitivtes list-user');
        console.log(error);
      })
  }

}
