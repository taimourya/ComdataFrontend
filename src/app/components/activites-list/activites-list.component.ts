import { Component, OnInit } from '@angular/core';
import {SearchService} from "../../services/search.service";

@Component({
  selector: 'app-activites-list',
  templateUrl: './activites-list.component.html',
  styleUrls: ['./activites-list.component.css']
})
export class ActivitesListComponent implements OnInit {

  totalPages: number = 5;
  page: number = 0;

  addMode: boolean = false;

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

  onCancelAdd() {
    this.addMode = false;
  }

  onStartAdd() {
    this.addMode = true;
  }

  onSubmitAdd() {
    console.log("submited");
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
