import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Table } from 'primeng/components/table/table';
import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/components/common/api';

import { CentroCustoDTO } from './../../../models/domain/centrocusto.dto';
import { CentrocustoService, Filter } from '../centrocusto.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { TITLE_CONFIG } from './../../../config/title.config';
import { AuthService } from './../../seguranca/auth.service';

@Component({
  selector: 'app-centrocusto-pesquisa',
  templateUrl: './centrocusto-pesquisa.component.html'
})
export class CentrocustoPesquisaComponent implements OnInit {

  entity = 'Centro de Custo';

  cols: any[];

  dataSource: CentroCustoDTO[];

  selectedRow: CentroCustoDTO;

  qtdSelectedRows = 0;

  totalRecords = 0;

  loading: boolean;

  filter = new Filter();

  constructor(
    private service: CentrocustoService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private auth: AuthService,
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
      .then(resultado => {
        this.dataSource = resultado.obj;
        this.totalRecords = resultado.totalElements;
      })
      .catch(erro => this.errorHandler.handle(erro));
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
      .then(() => {
        this.findAll(this.filter.page);
        this.messageService.add({severity: 'success', summary: 'Ativação',
          detail: `${this.entity} ativado com sucesso!`});
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  disableById(obj: any) {
    this.service.disableById(obj.id)
      .then(() => {
        this.findAll(this.filter.page);
        this.messageService.add({severity: 'success', summary: 'Desativação',
          detail: `${this.entity} desativado com sucesso!`});
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  uncheckAll() {
    this.selectedRow = null;
    this.qtdSelectedRows = 0;
  }

  onRowsSelectUnSelect(event) {
    event ? this.qtdSelectedRows++ : this.qtdSelectedRows = 0;
  }

  onRowSelect(event) {
    this.qtdSelectedRows++;
  }

  onRowUnselect(event) {
    this.qtdSelectedRows--;
  }

  onUploadHandler(event, uploader) {
    for (const file of event.files) {
      this.uploadFile(file, uploader);
    }
  }

  uploadFile(file, uploader) {
    const reader: FileReader = new FileReader();
    reader.readAsText(file);
    reader.onload = (e) => {
      const csv = reader.result;
      const allTextLines = csv.toString().split(/\r|\n|\r/);
      const headers = allTextLines[0].split(';');
      for (let i = 0; i < allTextLines.length; i++) {
        if (i > 0) {
          if (allTextLines[i].split(';').length === headers.length) {
            this.uploadData(allTextLines[i]);
          }
        }
      }
      uploader.clear();
    };
    this.messageService.add({severity: 'success', summary: 'Importação de Arquivo',
      detail: `Arquivo enviado para processamento!`});
  }

  uploadData(data: string) {
    this.service.upload(data)
    .then(() => {
      this.findAll(this.filter.page);
    })
    .catch(erro => {
      this.errorHandler.handle(erro);
    });
  }
}
