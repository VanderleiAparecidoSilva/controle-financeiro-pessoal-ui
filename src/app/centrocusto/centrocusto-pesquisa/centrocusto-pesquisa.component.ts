import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/components/common/api';

import { CentroCustoDTO } from './../../../models/domain/centrocusto.dto';
import { CentrocustoService, Filter } from '../centrocusto.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-centrocusto-pesquisa',
  templateUrl: './centrocusto-pesquisa.component.html',
  styleUrls: ['./centrocusto-pesquisa.component.css']
})
export class CentrocustoPesquisaComponent implements OnInit {

  entityName = 'Centro de Custo';

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
    private title: Title) { }

  ngOnInit() {
    this.title.setTitle(`${environment.childTitle} Pesquisa de ${this.entityName}`);

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

  columnFilter(event: any) {
    if (event.key === 'Enter') {
      if (event.target.value === '') {
        this.findAll(this.filter.page);
      } else {
        this.findByName(0, event.target.value, 'false');
      }
    }
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

  findByName(page = 0, nome = '', ativo = 'true') {
    this.filter.page = page;
    this.service.findByName(this.filter, nome, ativo)
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
          detail: `${this.entityName} ativado com sucesso!`});
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  disableById(obj: any) {
    this.service.disableById(obj.id)
      .then(() => {
        this.findAll(this.filter.page);
        this.messageService.add({severity: 'success', summary: 'Desativação',
          detail: `${this.entityName} desativado com sucesso!`});
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

  downloadExampleCSV(args) {
    let csv = 'Tipo;Nome;Aplica na Receita;Aplica na Despesa\n';
    csv += args.type + ';;;';
    const hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = args.filename;
    hiddenElement.click();
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
