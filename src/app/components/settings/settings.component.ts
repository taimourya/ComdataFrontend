import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {


  data: any = {
    tinactiviteMs: 5000,
    tfermetureSessionMs: 10000
  }

  constructor() { }

  ngOnInit(): void {
  }

}
