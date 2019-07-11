import { Component, OnInit } from '@angular/core';

import { MessageService } from 'primeng/api';

import { RelatoriosService } from '../relatorios.service';

@Component({
  selector: 'app-relatorio-conta-bancaria',
  templateUrl: './relatorio-conta-bancaria.component.html',
  styleUrls: ['./relatorio-conta-bancaria.component.css']
})
export class RelatorioContaBancariaComponent implements OnInit {

  constructor(
    private relatoriosService: RelatoriosService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
  }

  gerar() {
    this.relatoriosService.contaBancariaReport()
      .then(report => {
        if (report.size > 0) {
          const url = window.URL.createObjectURL(report);
          window.open(url);
        } else {
          this.messageService.add({severity: 'error', summary: 'Relatório de Conta Bancária',
          detail: `Não encontrou nenhuma conta bancária para o filtro informado!`});
        }
      });
  }
}
