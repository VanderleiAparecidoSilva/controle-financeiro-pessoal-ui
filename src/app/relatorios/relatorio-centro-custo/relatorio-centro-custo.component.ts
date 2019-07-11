import { Component, OnInit } from '@angular/core';

import { SelectItem, MessageService } from 'primeng/api';

import { RelatoriosService } from '../relatorios.service';

@Component({
  selector: 'app-relatorio-centro-custo',
  templateUrl: './relatorio-centro-custo.component.html',
  styleUrls: ['./relatorio-centro-custo.component.css']
})
export class RelatorioCentroCustoComponent implements OnInit {

  types: SelectItem[];

  selectedType: string;

  constructor(
    private relatoriosService: RelatoriosService,
    private messageService: MessageService
  ) {
    this.types = [
      { label: 'Receita', value: 'Receita', icon: 'fa fa-print'},
      { label: 'Despesa', value: 'Despesa', icon: 'fa fa-print'},
    ];
  }

  ngOnInit() {
  }

  gerar() {
    if (this.selectedType !== undefined) {
      this.relatoriosService.centroCustoReport(this.selectedType)
      .then(report => {
        if (report.size > 0) {
          const url = window.URL.createObjectURL(report);
          window.open(url);
        } else {
          this.messageService.add({severity: 'error', summary: 'Relatório de Centro de Custo',
          detail: `Não encontrou nenhum centro de custo para o filtro informado!`});
        }
      });
    }
  }

}
