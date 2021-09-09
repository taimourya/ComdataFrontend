import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-activiter-detail',
  templateUrl: './activiter-detail.component.html',
  styleUrls: ['./activiter-detail.component.css']
})
export class ActiviterDetailComponent implements OnInit {

  id: number = 0;

  editMode: boolean = false;

  userData: any = {
    'id': '1',
    'name': 'UBER',
    'date_creation': '1998-11-19',
    'isActive': false,
    'tinactiviteMs': 5000,
    'tfermetureSessionMs': 10000,
  }

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id']

  }

  onClickEdit() {
    this.editMode = !this.editMode;
  }



}
