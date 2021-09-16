import {Component, OnDestroy, OnInit} from '@angular/core';
import {AdminService} from "../../services/admin.service";
import {AuthService} from "../../services/auth.service";
import {SuperviseurService} from "../../services/superviseur.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  authRole: string = '';

  ChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  ChartLegend = true;
  charts: any = [];

  activites: any = [];

  selectedActivite: number = 1;
  dateFromFilter: any = '2021-06-01';
  dateToFilter: any = '2021-10-01';

  subscribeRole:any;

  constructor(private adminService: AdminService,
              private superviseurService: SuperviseurService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.subscribeRole = this.authService.afterSetRole.subscribe(role => {
      this.authRole = role;
      if(this.authRole == 'admin') {
        this.getActivites();
      }
      this.getStatsPieActivite();
    });
  }


  getStatsPieActivite() {
    if(this.authRole == 'admin') {
      this.adminService.fetchStatistiquesPieByActivite(
        this.selectedActivite,
        this.dateFromFilter,
        this.dateToFilter
      ).subscribe(data => {
        this.charts = [];
        let datan: any = data;
        for(let i = 0; i < datan.statsCollaborateurs.length; i++) {
          let stats = datan.statsCollaborateurs[i];
          this.addToChartPie(stats);
        }
      });
    }
    else if(this.authRole == 'superviseur') {
      this.superviseurService.fetchStatistiquesPieByActivite(
        this.dateFromFilter,
        this.dateToFilter
      ).subscribe(data => {
        this.charts = [];
        let datan: any = data;
        for(let i = 0; i < datan.statsCollaborateurs.length; i++) {
          let stats = datan.statsCollaborateurs[i];
          this.addToChartPie(stats);
        }
      });
    }
  }

  addToChartPie(data: any) {
    let chart: any = {
      matricule: data.collaborateur_matricule,
      fullname: data.collaborateur_fullname,
      labels: [
        'actif',
        'pause',
        'inactif'
      ],
      datas: [
        data.activitesPercent.toFixed(2),
        data.pausesPercent.toFixed(2),
        data.inactivitesPercent.toFixed(2)
      ],
    }
    this.charts.push(chart);
  }

  getActivites() {
      this.adminService.getActivites('', 0, 100).subscribe(data => {
        let datan: any = data;
        this.activites = datan.content;
        this.selectedActivite = this.activites[0].id;
      }, error => {
        console.log(error);
      })
  }

  onFilterChange() {
    console.log('date from : ' + this.dateFromFilter);
    this.getStatsPieActivite();
  }

  ngOnDestroy(): void {
    this.subscribeRole.unsubscribe();
  }

}















/*

fetchStats() {
  this.adminService.fetchStatistiquesCollaborateur("matcolcol1UBER", "day",
    new Date('2016-07-07'), new Date('2016-07-07'))
    .subscribe(data => {
      console.log(data);
      let datan: any = data;
      this.charts = [];
      this.addToChart(datan.params);
    }, error =>  {
      console.log('error at dashboard');
      console.log(error);
    });
}

fetchStatsByActivite() {
  this.adminService.fetchStatistiquesByActivite(1, "day",
    new Date('2016-07-07'), new Date('2016-07-07'))
    .subscribe(data => {
      console.log(data);
      this.charts = [];
      let datan: any = data;
      for(let i = 0; i < datan.statsCollaborateurs.length; i++) {
        let stats = datan.statsCollaborateurs[i];
        this.addToChart(stats);
      }
    }, error =>  {
      console.log('error at dashboard');
      console.log(error);
    });
}

addToChart(data: any) {
  let chart: any = {
    matricule: data.collaborateurMatricule,
    fullname: data.collaborateurFullName,
    labels: [],
    datas: [
      {
        label: 'actif',
        data: []
      },
      {
        label: 'pause',
        data: []
      },
      {
        label: 'inactif',
        data: []
      },
    ],
  }
  for(let i = 0; i < data.params.length; i++) {
    let param = data.params[i];
    chart.labels.push(param.date);
    chart.datas[0].data.push(param.totalActif);
    chart.datas[1].data.push(param.totalPause);
    chart.datas[2].data.push(param.totalInactif);
  }

  this.charts.push(chart);
}*/
