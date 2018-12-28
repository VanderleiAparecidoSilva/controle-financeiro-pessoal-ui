import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { LazyLoadEvent, SelectItem } from 'primeng/api';

import * as moment from 'moment';

import { LancamentoDTO } from './../../../models/domain/lancamento.dto';
import { environment } from 'src/environments/environment';
import { Filter, LancamentoService } from '../lancamento.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-lancamento-pesquisa',
  templateUrl: './lancamento-pesquisa.component.html',
  styleUrls: ['./lancamento-pesquisa.component.css']
})
export class LancamentoPesquisaComponent implements OnInit {

  entityName = 'Lançamentos';

  cols: any[];

  dataSourceCredit: LancamentoDTO[];

  dataSourceDebit: LancamentoDTO[];

  selectedRowCredit: LancamentoDTO;

  selectedRowDebit: LancamentoDTO;

  qtdSelectedRowsCredit = 0;

  qtdSelectedRowsDebit = 0;

  totalRecordsCredit = 0;

  totalRecordsDebit = 0;

  loading: boolean;

  filter = new Filter();

  calendarPortuguese: any;

  constructor(
    private title: Title,
    private service: LancamentoService,
    private errorHandler: ErrorHandlerService,
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

    setTimeout(() => {
      this.loading = true;
    });

    this.defineCalendarPortuguese();

    this.defineFilters(this.filter);
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

  defineFilters(filter: Filter) {
    const dtInicial = localStorage.getItem('dtInicialLancamento');
    const dtFinal = localStorage.getItem('dtFinalLancamento');
    const somenteAbertos = localStorage.getItem('somenteTitulosEmAberto');

    if (dtInicial) {
      filter.dtInicial = moment(dtInicial).toDate();
    }

    if (dtFinal) {
      filter.dtFinal = moment(dtFinal).toDate();
    }

    if (somenteAbertos) {
      filter.somenteTitulosAbertos = somenteAbertos;
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

    this.dataSourceCredit = null;
    this.dataSourceDebit = null;

    this.findAllReceita(page);
    this.findAllDespesa(page);
  }

  columnFilter(event: any) {
    if (event.key === 'Enter') {
      this.findCreditDebit();
    }
  }

  saveFilterData(filter: Filter) {
    localStorage.setItem('dtInicialLancamento', filter.dtInicial.toDateString());
    localStorage.setItem('dtFinalLancamento', filter.dtFinal.toDateString());
    localStorage.setItem('somenteTitulosEmAberto', filter.somenteTitulosAbertos);
  }

  uncheckAllCredit() {
    this.selectedRowCredit = null;
    this.qtdSelectedRowsCredit = 0;
  }

  uncheckAllDebit() {
    this.selectedRowDebit = null;
    this.qtdSelectedRowsDebit = 0;
  }

  onRowsSelectUnSelectCredit(event) {
    event ? this.qtdSelectedRowsCredit++ : this.qtdSelectedRowsCredit = 0;
  }

  onRowsSelectUnSelectDebit(event) {
    event ? this.qtdSelectedRowsDebit++ : this.qtdSelectedRowsDebit = 0;
  }

  onRowSelectCredit(event) {
    this.qtdSelectedRowsCredit++;
  }

  onRowSelectDebit(event) {
    this.qtdSelectedRowsDebit++;
  }

  onRowUnselectCredit(event) {
    this.qtdSelectedRowsCredit--;
  }

  onRowUnselectDebit(event) {
    this.qtdSelectedRowsDebit--;
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

}
