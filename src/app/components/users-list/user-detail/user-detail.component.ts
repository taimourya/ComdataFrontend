import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AdminService} from "../../../services/admin.service";
import {SuperviseurService} from "../../../services/superviseur.service";
import {AuthService} from "../../../services/auth.service";
import {NgForm} from "@angular/forms";
import {AccountService} from "../../../services/account.service";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit, OnDestroy {

  matricule: string = '';
  authMatricule: string = '';

  editMode: boolean = false;

  userData: any = {}

  role: string = '';

  messageSuccess: string = '';
  messageFailed: string = '';

  isLoading: boolean = false;

  subscribeMatricule: any;

  constructor(private route: ActivatedRoute,
              private adminService: AdminService,
              private superviseurService: SuperviseurService,
              private authService: AuthService,
              private accountService: AccountService) { }

  ngOnInit(): void {

    this.subscribeMatricule = this.accountService.matriculeStatus.subscribe(matricule => {
      this.authMatricule = matricule;
      this.matricule = this.route.snapshot.params['userId'];
      let sub = this.authService.afterSetRole.subscribe(role => {
        this.role = role;
        this.getUser();
        sub.unsubscribe();
      });
    });

  }

  getUser() {
    this.isLoading = true;
    if(this.matricule == this.authMatricule) {
      this.authService.fetchProfil().subscribe(data => {
        this.userData = data;
        let splitedName = this.userData.fullName.split(' ');
        this.userData.firstname = splitedName[0];
        this.userData.lastname = splitedName[1];
        this.userData.passwd = '';
        this.userData.confirmPasswd = '';
        this.isLoading = false;
      }, error => {
        console.log('error at user details');
        console.log(error);
      });
    }
    else if(this.role == 'admin') {
      this.adminService.fetchUser(this.matricule).subscribe(data => {
        this.userData = data;
        let splitedName = this.userData.fullName.split(' ');
        this.userData.firstname = splitedName[0];
        this.userData.lastname = splitedName[1];
        this.userData.passwd = '';
        this.userData.confirmPasswd = '';
        this.isLoading = false;
      }, error => {
        console.log('error at user details');
        console.log(error);
      });
    }
    else {
      this.superviseurService.fetchCollaborateur(this.matricule).subscribe(data => {
        this.userData = data;
        let splitedName = this.userData.fullName.split(' ');
        this.userData.firstname = splitedName[0];
        this.userData.lastname = splitedName[1];
        this.userData.passwd = '';
        this.userData.confirmPasswd = '';
        this.isLoading = false;
      }, error => {
        console.log('error at user details');
        console.log(error);
      });
    }
  }

  onClickEdit() {
    this.editMode = !this.editMode;
  }

  onSubmit(form: NgForm) {
    let body: any = {
      firstname: this.userData.firstname,
      lastname: this.userData.lastname,
      email: this.userData.email,
      phone: this.userData.phone,
      cin: this.userData.cin,
      adresse : this.userData.adresse,
      passwd: this.userData.passwd,
      confirmPasswd: this.userData.confirmPasswd,
      date_naissance: this.userData.date_naissance,
      type: this.userData.roleName,
    }

    if(this.matricule == this.authMatricule) {
      this.authService.editProfil(body).subscribe(data => {
        this.editMode = false;
        this.messageSuccess = 'informations modifier';
        this.accountService.changeStatus(true);
      }, error => {
        console.log('error lors de la modification user');
        console.log(error);
        this.messageFailed = 'erreur modification des informations';
      });
    }
    else if(this.role == 'admin') {
      if(body.type != 'admin') {
        body.activiter_id = this.userData.activiterId;
      }
      this.adminService.editUser(this.matricule, body).subscribe(data => {
        console.log(data);
        this.editMode = false;
        this.messageSuccess = 'informations modifier';
      }, error => {
        console.log('error lors de la modification user');
        console.log(error);
        this.messageFailed = 'erreur modification des informations';
      });
    }
    else {
      this.superviseurService.editCollaborateur(this.matricule, body).subscribe(data => {
        console.log(data);
        this.editMode = false;
        this.messageSuccess = 'informations modifier';
        this.authService.setRole(this.role);
      }, error => {
        console.log('error lors de la modification user');
        console.log(error);
        this.messageFailed = 'erreur modification des informations';
      })
    }
  }

  onEnable(){
    if(this.role == 'admin') {
      this.adminService.enableUser(this.matricule).subscribe(data => {
        this.getUser();
        this.messageSuccess = "utilisateur activer";
      }, error => {
        this.messageFailed = "impossible d'activer l'utilisateur";
      });
    }
    else {
      this.superviseurService.enableCollaborateur(this.matricule).subscribe(data => {
        this.getUser();
        this.messageSuccess = "utilisateur activer";
      }, error => {
        this.messageFailed = "impossible d'activer desactiver l'utilisateur";
      });
    }
  }

  onDisable() {
    if(this.role == 'admin') {
      this.adminService.disableUser(this.matricule).subscribe(data => {
          this.getUser();
        this.messageSuccess = "utilisateur desactiver";
      }, error => {
        this.messageFailed = "impossible de desactiver l'utilisateur";
      });
    }
    else {
      this.superviseurService.disableCollaborateur(this.matricule).subscribe(data => {
        this.getUser();
        this.messageSuccess = "utilisateur desactiver";
      }, error => {
        this.messageFailed = "impossible de desactiver l'utilisateur";
      });
    }
  }

  onChangeImage(event: any) {
    console.log(event.target.files[0]);
    this.authService.changeImage(event.target.files[0]).subscribe((data : any) => {
      this.userData.imageUri = data.imageUri;
      this.accountService.changeStatus(true);
      this.messageSuccess = "votre image a été changé avec succes";
    }, error => {
      this.messageFailed = "upload de l'image impossible";
    });
  }

  closeMessage() {
    this.messageSuccess = '';
    this.messageFailed = '';
  }

  ngOnDestroy(): void {
    this.subscribeMatricule.unsubscribe();
  }

}
