import { Component, OnInit } from '@angular/core';
import {SearchService} from "../../services/search.service";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {


  filterEtatCompte: string = "All";
  filterTypeCompte: string = "All";
  filterActiviter: number = -1;
  filterSession: string = "All";

  totalPages: number = 5;
  page: number = 0;

  constructor(
    private searchService: SearchService
  ) { }

  ngOnInit(): void {

    this.searchService.searchSubject.subscribe(mc => {
      this.getData();
    });
  }

  getData() {

  }


  onFilterChange() {
    console.log("filterEtatCompte : " + this.filterEtatCompte);
    console.log("filterTypeCompte : " + this.filterTypeCompte);
    console.log("filterActiviter : " + this.filterActiviter);
    console.log("filterSession : " + this.filterSession);
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
