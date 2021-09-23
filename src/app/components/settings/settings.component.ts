import { Component, OnInit } from '@angular/core';
import {SuperviseurService} from "../../services/superviseur.service";

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

  messageSuccess: string = '';
  messageFailed: string = '';

  temps1: number = 1;
  temps2: number = 1;

  isLoading: boolean = false;

  constructor(private superviseurService: SuperviseurService) { }

  ngOnInit(): void {
    this.getActivite();
  }

  getActivite() {
    this.isLoading = true;
    this.superviseurService.fetchParametrage().subscribe(data => {

      this.data = data;
      this.isLoading = false;

    }, error => {
      console.log('error at settings');
      console.log(error);
    });
  }

  onSubmit() {
    this.superviseurService.editParametrage(this.data.tfermetureSessionMs * this.temps1, this.data.tinactiviteMs * this.temps2).subscribe(data => {
      this.data = data;
      this.data.tinactiviteMs /=  this.temps1;
      this.data.tfermetureSessionMs /=  this.temps2;
      this.showSuccess('paramétre enregistrer');
    }, error => {
      this.showError('la modification de paramétre a échouer')
    });
  }



  onChangeTemps(temps: string, source: number) {

    this.data.tinactiviteMs *=  this.temps1;
    this.data.tfermetureSessionMs *=  this.temps2;

    if(temps === 'ms') {
      if(source === 1) {
        this.temps1 = 1;
      }
      else if(source === 2) {
        this.temps2 = 1;
      }
    }
    else if(temps === 's') {
      if(source === 1) {
        this.temps1 = 1000;
      }
      else if(source === 2) {
        this.temps2 = 1000;
      }
    }
    else if(temps === 'm') {
      if(source === 1) {
        this.temps1 = 1000 * 60;
      }
      else if(source === 2) {
        this.temps2 = 1000 * 60;
      }
    }

    this.data.tinactiviteMs /=  this.temps1;
    this.data.tfermetureSessionMs /=  this.temps2;
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
}
