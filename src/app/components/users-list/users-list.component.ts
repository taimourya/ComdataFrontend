import {Component, OnDestroy, OnInit} from '@angular/core';
import {SearchService} from "../../services/search.service";
import {AdminService} from "../../services/admin.service";
import {SuperviseurService} from "../../services/superviseur.service";
import {AccountService} from "../../services/account.service";
import {AuthService} from "../../services/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit, OnDestroy {


  filterEtatCompte: string = "All";
  filterTypeCompte: string = "All";
  filterActiviter: number = -1;
  filterSession: string = "All";

  totalPages: number = 5;
  page: number = 0;
  size: number = 8;

  role: string = '';

  users: any = [];
  activites: any = [];

  mc: string = '';
  subscriptionMc: any;
  isLoading: boolean = false;

  messageSuccess: string = '';
  messageFailed: string = '';

  constructor(
    private searchService: SearchService,
    private adminService: AdminService,
    private superviseurService: SuperviseurService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getActivites();
    let sub = this.authService.afterSetRole.subscribe(role => {
      this.role = role;
      this.getData();
      sub.unsubscribe();
    });
    this.subscriptionMc = this.searchService.searchSubject.subscribe(mc => {
      this.mc = mc;
      console.log(mc);
      this.getData();
    });
  }

  getData() {
    this.isLoading = true;
    if(this.role === 'admin') {
      this.adminService.fetchUsers(this.mc, this.filterTypeCompte,
                this.filterEtatCompte, this.filterSession, this.filterActiviter, this.page, this.size).subscribe(data => {
        console.log(data);
        console.log("user-list");
        let datan : any = data;
        this.users = datan.content;
        this.totalPages = datan.totalPage;
        if(this.totalPages != 0 && this.page  >= this.totalPages) {
          this.page = 0;
          this.getData();
        }
        this.isLoading = false;
      }, error => {
        console.log('error users list admin');
        console.log(error);
      });
    }
    else {
      this.superviseurService.fetchCollaborateurs(this.mc, this.filterEtatCompte,
                this.filterSession, this.page, this.size).subscribe(data => {
        console.log(data);
        let datan : any = data;
        this.users = datan.content;
        this.totalPages = datan.totalPage;
        if(this.totalPages != 0 && this.page  >= this.totalPages) {
          this.page = 0;
          this.getData();
        }
        this.isLoading = false;
      }, error => {
        console.log('error users list sup');
        console.log(error);
      });
    }
  }

  getActivites() {
    if(this.filterTypeCompte != 'admin') {
      this.adminService.getActivites('', 0, 100).subscribe(data => {
        let datan: any = data;
        this.activites = datan.content;
      }, error => {
        console.log('error actitivtes list-user');
        console.log(error);
      })
    }
  }


  onEnable(matricule: string){
    if(confirm('etes vous sur de vouloir continuer?')) {
      if(this.role == 'admin') {
        this.adminService.enableUser(matricule).subscribe(data => {
          this.getData();
          this.showSuccess("utilisateur activer");
        }, error => {
          this.showError("impossible d'activer l'utilisateur");
        });
      }
      else {
        this.superviseurService.enableCollaborateur(matricule).subscribe(data => {
          this.getData();
          this.showSuccess("utilisateur activer");
        }, error => {
          this.showError("impossible d'activer l'utilisateur");
        });
      }
    }
  }

  onDisable(matricule: string) {
    if(confirm('etes vous sur de vouloir continuer?')) {
      if(this.role == 'admin') {
        this.adminService.disableUser(matricule).subscribe(data => {
          this.getData();
          this.showSuccess("utilisateur desactiver");
        }, error => {
          this.showError("impossible de desactiver l'utilisateur");
        });
      }
      else {
        this.superviseurService.disableCollaborateur(matricule).subscribe(data => {
          this.getData();
          this.showSuccess("utilisateur desactiver");
        }, error => {
          this.showError("impossible de desactiver l'utilisateur");
        });
      }
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

  ngOnDestroy(): void {
    console.log("ondestroy");
    this.subscriptionMc.unsubscribe();
  }

}
