import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  pieChartData: any;

  options = {
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          const dataset = data.datasets[tooltipItem.datasetIndex];
          const valor = dataset.data[tooltipItem.index];
          const label = dataset.label ? (dataset.label + ': ') : '';

          return label + this.decimalPipe.transform(valor, '1.2-2');
        }
      }
    }
  };

  constructor(
    private dashboardService: DashboardService,
    private decimalPipe: DecimalPipe) { }

    ngOnInit() {
      this.configurarGraficoPizza();
    }

    configurarGraficoPizza() {
      this.dashboardService.lancamentosPorCentroCusto()
        .then(dados => {
          this.pieChartData = {
            labels: dados.map(dado => dado.centrocusto.nome),
            datasets: [
              {
                data: dados.map(dado => dado.total),
                backgroundColor: ['#FF9900', '#109618', '#990099', '#3B3EAC', '#0099C6',
                                    '#DD4477', '#3366CC', '#DC3912']
              }
            ]
          };
        });
    }
}
