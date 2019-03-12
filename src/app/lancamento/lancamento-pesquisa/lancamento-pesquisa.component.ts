import { AuthService } from 'src/app/seguranca/auth.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { LazyLoadEvent, MessageService, MenuItem } from 'primeng/api';

import * as moment from 'moment';

import { LancamentoDTO } from './../../../models/domain/lancamento.dto';
import { environment } from 'src/environments/environment';
import { Filter, LancamentoService } from '../lancamento.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lancamento-pesquisa',
  templateUrl: './lancamento-pesquisa.component.html',
  animations: [
    trigger('rowExpansionTrigger', [
        state('void', style({
            transform: 'translateX(-10%)',
            opacity: 0
        })),
        state('active', style({
            transform: 'translateX(0)',
            opacity: 1
        })),
        transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ],
  styleUrls: ['./lancamento-pesquisa.component.css']
})
export class LancamentoPesquisaComponent implements OnInit {

  entityName = 'Lançamentos';

  cols: any[];

  dataSourceCredit: LancamentoDTO[];

  dataSourceDebit: LancamentoDTO[];

  selectedRowCredit: LancamentoDTO;

  selectedRowDebit: LancamentoDTO;

  selectedCredits: LancamentoDTO[];

  selectedDebits: LancamentoDTO[];

  qtdSelectedRowsCredit = 0;

  qtdSelectedRowsDebit = 0;

  totalRecordsCredit = 0;

  totalRecordsDebit = 0;

  creditSum = 0;

  debitSum = 0;

  loading: boolean;

  filter = new Filter();

  calendarPortuguese: any;

  creditSplitItems: MenuItem[];

  debitSplitItems: MenuItem[];

  constructor(
    private title: Title,
    private service: LancamentoService,
    private errorHandler: ErrorHandlerService,
    private auth: AuthService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.title.setTitle(`${environment.childTitle} Pesquisa de ${this.entityName}`);

    this.cols = [
      { field: 'vencimento', header: 'Vencimento' },
      { field: 'descricao', header: 'Descrição' },
      { field: 'valor', header: 'Valor R$' },
      { field: 'parcela', header: 'Parcela' },
      { field: 'status', header: 'Status' }
    ];

    this.defineMenuCredit();
    this.defineMenuDebit();

    setTimeout(() => {
      this.loading = true;
    });

    this.defineCalendarPortuguese();

    this.defineFilters(this.filter);
  }

  defineMenuCredit() {
    const canDisabled = this.qtdSelectedRowsCredit === 0;
    const canEditAndDelete = (this.qtdSelectedRowsCredit === 0 || this.qtdSelectedRowsCredit > 1);
    const canReverse = (this.qtdSelectedRowsCredit === 0 || this.selectedCredits.filter(cr => cr.status.toUpperCase() === 'RECEBIDO').length != this.selectedCredits.length);

    this.creditSplitItems = [
      { label: 'Receber', icon: 'pi pi-check', disabled: canDisabled, command: () => { this.receiveCredit(); } },
      { label: 'Estornar', icon: 'pi pi-step-backward', disabled: canReverse, command: () => { this.reverseCredit(); } },
      { disabled: true, target: 'separator' },
      { label: 'Editar', icon: 'pi pi-refresh', disabled: canEditAndDelete, command: () => { this.editCredit(); } },
      { label: 'Excluir', icon: 'pi pi-trash', disabled: canDisabled, command: () => { this.deleteCredit(); } },
      { disabled: true, target: 'separator' },
      { label: 'Lançar', icon: 'pi pi-plus', disabled: false, command: () => { this.insertCredit(); } }
    ];
  }

  defineMenuDebit() {
    const canDisabled = this.qtdSelectedRowsDebit === 0;
    const canEditAndDelete = (this.qtdSelectedRowsDebit === 0 || this.qtdSelectedRowsDebit > 1);
    const canReverse = (this.qtdSelectedRowsDebit === 0 || this.selectedDebits.filter(cr => cr.status.toUpperCase() === 'PAGO').length != this.selectedDebits.length);

    this.debitSplitItems = [
      { label: 'Pagar', icon: 'pi pi-check', disabled: canDisabled, command: () => { this.payDebit(); } },
      { label: 'Estornar', icon: 'pi pi-step-backward', disabled: canReverse, command: () => { this.reverseDebit(); } },
      { disabled: true, target: 'separator' },
      { label: 'Editar', icon: 'pi pi-refresh', disabled: canEditAndDelete, command: () => { this.editDebit(); } },
      { label: 'Excluir', icon: 'pi pi-trash', disabled: canDisabled, command: () => { this.deleteDebit(); } },
      { disabled: true, target: 'separator' },
      { label: 'Lançar', icon: 'pi pi-plus', disabled: false, command: () => { this.insertDebit(); } }
    ];
  }

  loadTransactionsLazy(event: LazyLoadEvent) {
    setTimeout(() => {
      this.loading = true;
    });

    setTimeout(function() {
      const page = event.first / event.rows;
      this.findCreditDebit(page);
    }.bind(this, 1));

    setTimeout(() => {
      this.loading = false;
    });
  }

  receiveCredit() {
    console.log(this.selectedCredits.length);
    console.log('Clicou em receber');
  }

  reverseCredit() {
    console.log(this.selectedCredits.length);
    console.log('Clicou em estornar crédito');
  }

  editCredit() {
    this.router.navigate(['/lancamento/nova/receita', this.selectedCredits[0].id]);
  }

  deleteCredit() {
    this.selectedCredits.forEach(cr => {
      this.service.disable(cr.id)
      .then(resultado => {
        this.dataSourceCredit = [];
        this.findAllReceita();
        this.clearSelectedCredit();
      })
      .catch(erro => this.errorHandler.handle(erro));
    });
  }

  insertCredit() {
    this.router.navigate(['/lancamento/nova/receita']);
  }

  payDebit() {
    console.log(this.selectedDebits.length);
    console.log('Clicou em pagar');
  }

  reverseDebit() {
    console.log(this.selectedDebits.length);
    console.log('Clicou em estornar débito');
  }

  editDebit() {
    this.router.navigate(['/lancamento/nova/despesa', this.selectedDebits[0].id]);
  }

  deleteDebit() {
    this.selectedDebits.forEach(db => {
      this.service.disable(db.id)
      .then(resultado => {
        this.dataSourceDebit = [];
        this.findAllDespesa();
        this.clearSelectedDebit();
      })
      .catch(erro => this.errorHandler.handle(erro));
    });
  }

  insertDebit() {
    this.router.navigate(['/lancamento/nova/despesa']);
  }

  clearSelectedCredit() {
    this.selectedRowCredit = null;
    this.selectedCredits = [];
    this.qtdSelectedRowsCredit = 0;
  }

  clearSelectedDebit() {
    this.selectedRowDebit = null;
    this.selectedDebits = [];
    this.qtdSelectedRowsDebit = 0;
  }

  defineFilters(filter: Filter) {
    const dtInicial = localStorage.getItem('dtInicialLancamento_' + this.auth.jwtPayload.user_name);
    const dtFinal = localStorage.getItem('dtFinalLancamento_' + this.auth.jwtPayload.user_name);
    const somenteAbertos = localStorage.getItem('somenteTitulosEmAberto_' + this.auth.jwtPayload.user_name);

    if (dtInicial) {
      filter.dtInicial = moment(dtInicial).toDate();
    }

    if (dtFinal) {
      filter.dtFinal = moment(dtFinal).toDate();
    }

    if (somenteAbertos) {
      if (somenteAbertos === 'undefined') {
        filter.somenteTitulosAbertos = 'Sim';
      } else {
        filter.somenteTitulosAbertos = somenteAbertos;
      }
    }

    filter.descricaoLancamento = '';
  }

  findAllReceita(page = 0) {
    this.filter.page = page;
    this.service.findAllCreditByPeriod(this.filter)
      .then(resultado => {
        this.dataSourceCredit = resultado.obj;
        this.totalRecordsCredit = resultado.totalElements;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  findAllDespesa(page = 0) {
    this.filter.page = page;
    this.service.findAllDebitByPeriod(this.filter)
      .then(resultado => {
        this.dataSourceDebit = resultado.obj;
        this.totalRecordsDebit = resultado.totalElements;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  findCreditDebit(page = 0) {
    this.saveFilterData(this.filter);

    this.dataSourceCredit = [];
    this.dataSourceDebit = [];

    this.findAllReceita(page);
    this.findAllDespesa(page);
  }

  columnFilter(event: any) {
    if (event.key === 'Enter') {
      this.findCreditDebit();
    }
  }

  saveFilterData(filter: Filter) {
    localStorage.setItem('dtInicialLancamento_' + this.auth.jwtPayload.user_name, filter.dtInicial.toDateString());
    localStorage.setItem('dtFinalLancamento_' + this.auth.jwtPayload.user_name, filter.dtFinal.toDateString());
    localStorage.setItem('somenteTitulosEmAberto_' + this.auth.jwtPayload.user_name, filter.somenteTitulosAbertos);
  }

  onRowSelectCredit(event) {
    this.qtdSelectedRowsCredit++;
    this.defineMenuCredit();
  }

  onRowSelectDebit(event) {
    this.qtdSelectedRowsDebit++;
    this.defineMenuDebit();
  }

  onRowUnselectCredit(event) {
    this.qtdSelectedRowsCredit--;
    this.defineMenuCredit();
  }

  onRowUnselectDebit(event) {
    this.qtdSelectedRowsDebit--;
    this.defineMenuDebit();
  }

  onUploadHandler(event, uploader) {
    for (const file of event.files) {
      this.uploadFile(file, uploader);
    }
  }

  sumCredit() {
    return this.dataSourceCredit.reduce((summ, v) => summ += v.valorParcela, 0);
  }

  sumDebit() {
    return this.dataSourceDebit.reduce((summ, v) => summ += v.valorParcela, 0);
  }

  downloadExampleCSV(args) {
    let csv = 'Tipo;Descricao;Centro de Custo Primario;Centro de Custo Secundario;Vencimento;Valor da Parcela;Parcela;Total de Parcelas;' +
    'Gerar Parcela Unica;Conta Bancaria;Observacao;Status;Tipo do Lancamento\n';
    csv += args.type + ';;;;;;;;' + args.singleparcel + ';;;' + args.status + ';' + args.launchtype;
    const hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=UTF-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = args.filename;
    hiddenElement.click();
  }

  uploadFile(file, uploader) {
    const reader: FileReader = new FileReader();
    reader.readAsText(file, 'UTF-8');
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
      this.findCreditDebit(this.filter.page);
    })
    .catch(erro => {
      this.errorHandler.handle(erro);
    });
  }

  defineCalendarPortuguese() {
    this.calendarPortuguese = {
      firstDayOfWeek: 0,
      dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
      dayNamesMin: ['Do', 'Se', 'Te', 'Qa', 'Qi', 'Se', 'Sa'],
      monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro',
        'Outubro', 'Novembro', 'Dezembro'],
      monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      today: 'Hoje',
      clear: 'Limpar'
    };
  }

  uncheckAllCredit() {
    this.selectedRowCredit = null;
    this.selectedCredits = [];
    this.qtdSelectedRowsCredit = 0;
    this.defineMenuCredit();
  }

  uncheckAllDebit() {
    this.selectedRowDebit = null;
    this.selectedDebits = [];
    this.qtdSelectedRowsDebit = 0;
    this.defineMenuDebit();
  }
}
