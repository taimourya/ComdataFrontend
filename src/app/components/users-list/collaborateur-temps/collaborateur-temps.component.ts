import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-collaborateur-temps',
  templateUrl: './collaborateur-temps.component.html',
  styleUrls: ['./collaborateur-temps.component.css']
})
export class CollaborateurTempsComponent implements OnInit {

  matricule: string = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.matricule = this.route.snapshot.params['userId'];
  }

}
