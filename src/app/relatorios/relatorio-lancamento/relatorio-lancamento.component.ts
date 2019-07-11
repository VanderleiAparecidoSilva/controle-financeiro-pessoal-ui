import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as moment from 'moment';

import { DialogService, MessageService } from 'primeng/api';

import { Filter } from './../relatorios.service';
import { RelatoriosService } from '../relatorios.service';
import { AuthService } from 'src/app/seguranca/auth.service';
import { LancamentoFiltroDTO } from 'src/models/domain/lancamentofiltro.dto';
import { ListaDescricaoLancamentoComponent } from 'src/app/lancamento/lancamento-cadastro/lista-descricao-lancamento.component';

@Component({
  selector: 'app-relatorio-lancamento',
  templateUrl: './relatorio-lancamento.component.html',
  styleUrls: ['./relatorio-lancamento.component.css'],
  providers: [DialogService]
})
export class RelatorioLancamentoComponent implements OnInit {

  filter = new Filter();

  calendarPortuguese: any;

  typeName: string;

  constructor(
    private relatoriosService: RelatoriosService,
    private auth: AuthService,
    private router: Router,
    private dialogService: DialogService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    if (this.router.url === '/relatorio/lancamento/receita') {
      this.typeName = 'Receita(s)';
    } else if (this.router.url === '/relatorio/lancamento/despesa') {
      this.typeName = 'Despesa(s)';
    }

    this.defineCalendarPortuguese();
    this.defineFilters(this.filter);
  }

  gerar() {
    this.relatoriosService.lancamentoReport(this.filter)
      .then(report => {
        if (report.size > 0) {
          const url = window.URL.createObjectURL(report);
          window.open(url);
        } else {
          this.messageService.add({severity: 'error', summary: 'Relatório de Lançamento',
            detail: `Não encontrou nenhum lançamento para o filtro informado!`});
        }
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

    if (this.router.url === '/relatorio/lancamento/receita') {
      filter.type = 'RECEITA';
    } else if (this.router.url === '/relatorio/lancamento/despesa') {
      filter.type = 'DESPESA';
    }
  }

  findDescription() {
    const ref = this.dialogService.open(ListaDescricaoLancamentoComponent, {
      data: this.filter.type,
      header: 'Selecione a descrição',
      width: '70%',
      contentStyle: { 'max-height': '350px', 'overflow': 'auto' }
    });

    ref.onClose.subscribe((name: LancamentoFiltroDTO) => {
        if (name) {
          this.filter.descricaoLancamento = name.nome;
        }
    });
  }

  columnFilter(event: any) {
    if (event.key === 'Enter') {
      this.gerar();
    }
  }
}
