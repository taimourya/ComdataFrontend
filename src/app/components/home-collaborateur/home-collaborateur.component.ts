import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../services/account.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home-collaborateur',
  templateUrl: './home-collaborateur.component.html',
  styleUrls: ['./home-collaborateur.component.css']
})
export class HomeCollaborateurComponent implements OnInit {


  constructor(private accountService: AccountService,
              private route: Router) { }

  ngOnInit(): void {


  }

}
