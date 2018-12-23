import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { LazyLoadEvent, SelectItem } from 'primeng/api';

import { LancamentoDTO } from './../../../models/domain/lancamento.dto';
import { environment } from 'src/environments/environment';
import { Filter } from '../lancamento.service';

@Component({
  selector: 'app-lancamento-pesquisa',
  templateUrl: './lancamento-pesquisa.component.html',
  styleUrls: ['./lancamento-pesquisa.component.css']
})
export class LancamentoPesquisaComponent implements OnInit {

  entityName = 'Lançamentos';

  cols: any[];

  dataSource: LancamentoDTO[];

  selectedRow: LancamentoDTO;

  qtdSelectedRows = 0;

  totalRecords = 0;

  loading: boolean;

  filter = new Filter();

  calendarPortuguese: any;

  typesTitleView: SelectItem[];

  selectedTypeTitleView: String = 'Sim';

  constructor(
    private title: Title
  ) { }

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

    this.typesTitleView = [];
    this.typesTitleView.push({label: 'Sim', value: 'Sim', icon: 'fa fa-check'});
    this.typesTitleView.push({label: 'Não', value: 'Nao', icon: 'fa fa-times'});

    this.defineCalendarPortuguese();
  }

  loadTransactionsLazy(event: LazyLoadEvent) {
    setTimeout(() => {
      this.loading = true;
    });

    setTimeout(function() {
      const page = event.first / event.rows;
      // this.findAll(page);
    }.bind(this, 1));

    setTimeout(() => {
      this.loading = false;
    });
  }

  columnFilter(event: any) {
    if (event.key === 'Enter') {
      if (event.target.value === '') {
        // this.findAll(this.filter.page);
      } else {
        // this.findByName(0, event.target.value, 'false');
      }
    }
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
