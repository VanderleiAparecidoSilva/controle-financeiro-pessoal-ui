import { TITLE_CONFIG } from './../../../config/title.config';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/components/common/api';

import { CentrocustoService, Filter } from '../centrocusto.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { CentroCustoDTO } from 'src/models/domain/centrocusto.dto';

@Component({
  selector: 'app-centrocusto-pesquisa',
  templateUrl: './centrocusto-pesquisa.component.html',
  providers: [
    MessageService
  ]
})
export class CentrocustoPesquisaComponent implements OnInit {

  object = 'Centro de Custo';

  dataSource: CentroCustoDTO[];

  centroCustos: CentroCustoDTO[];

  cols: any[];

  selectedRows: CentroCustoDTO;

  qtdSelectedRows = 0;

  totalRecords = 0;

  loading: boolean;

  filter = new Filter();

  constructor(
    private service: CentrocustoService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private title: Title) { }

  ngOnInit() {
    this.title.setTitle(`${TITLE_CONFIG.childTitle} Pesquisa de Centro de Custos`);

    this.cols = [
      { field: 'nome', header: 'Nome' },
      { field: 'aplicarNaReceita', header: 'Aplicar na Receita' },
      { field: 'aplicarNaDespesa', header: 'Aplicar na Despesa' }
    ];
    setTimeout(() => {
      this.loading = true;
    });
  }

  loadTransactionsLazy(event: LazyLoadEvent) {
    setTimeout(() => {
      this.loading = true;
    });

    setTimeout(function() {
      const page = event.first / event.rows;
      this.findAll(page);
    }.bind(this, 1));
    setTimeout(() => {
      this.loading = false;
    });
  }

  findAll(page = 0) {
    this.filter.page = page;
    this.service.findAll(this.filter)
      .subscribe(response => {
        this.dataSource = response['content'];
        this.totalRecords = response['totalElements'];
      },
      error => {
        this.errorHandler.handle(error);
      });
  }

  enable(obj: any) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja prosseguir?',
      header: 'Confirmação de Ativação',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.enableById(obj);
      }
    });
  }

  disable(obj: any) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja prosseguir?',
      header: 'Confirmação de Desativação',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.disableById(obj);
      }
    });
  }

  enableById(obj: any) {
    this.service.enableById(obj.id)
      .subscribe(response => {
        this.findAll(this.filter.page);
        this.messageService.add({severity: 'success', summary: 'Ativação',
          detail: `${this.object} ativado com sucesso!`});
      },
      error => {
        this.errorHandler.handle(error);
      });
  }

  disableById(obj: any) {
    this.service.disableById(obj.id)
      .subscribe(response => {
        this.findAll(this.filter.page);
        this.messageService.add({severity: 'success', summary: 'Desativação',
          detail: `${this.object} desativado com sucesso!`});
      },
      error => {
        this.errorHandler.handle(error);
      });
  }

  uncheckAll() {
    this.selectedRows = null;
    this.qtdSelectedRows = 0;
  }

  onRowSelect(event) {
    this.qtdSelectedRows++;
  }

  onRowUnselect(event) {
    this.qtdSelectedRows--;
  }
}
