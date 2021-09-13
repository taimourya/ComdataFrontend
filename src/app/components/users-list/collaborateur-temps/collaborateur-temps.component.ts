import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AdminService} from "../../../services/admin.service";
import {SuperviseurService} from "../../../services/superviseur.service";
import {AuthService} from "../../../services/auth.service";
import {AccountService} from "../../../services/account.service";

@Component({
  selector: 'app-collaborateur-temps',
  templateUrl: './collaborateur-temps.component.html',
  styleUrls: ['./collaborateur-temps.component.css']
})
export class CollaborateurTempsComponent implements OnInit {

  matricule: string = '';
  authRole: string = '';

  collTempsInfo: any = {};

  isLoading: boolean = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private adminService: AdminService,
              private superviseur: SuperviseurService,
              private authService: AuthService,
              private accountService: AccountService) { }

  ngOnInit(): void {

    this.authService.afterSetRole.subscribe(role => {
      this.authRole = role;
      this.matricule = this.route.snapshot.params['userId'];
      this.getCollaborateur();
    });

  }

  getCollaborateur() {
    this.isLoading = true;
    if(this.authRole == 'admin') {
      this.adminService.fetchTempsCollaborateur(this.matricule).subscribe(data => {
        console.log(data);
        this.collTempsInfo = data;
        this.isLoading = false;
      }, error => {
        console.log('error on temps coll');
        console.log(error);
        //this.router.navigateByUrl("/403");
      });
    }
    else if(this.authRole == 'superviseur') {
      this.superviseur.fetchTempsCollaborateur(this.matricule).subscribe(data => {
        console.log(data);
        this.collTempsInfo = data;
        this.isLoading = false;
      }, error => {
        console.log('error on temps coll');
        console.log(error);
        //this.router.navigateByUrl("/403");
      });
    }
  }

}
