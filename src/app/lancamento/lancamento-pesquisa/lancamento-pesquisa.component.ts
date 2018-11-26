import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { LazyLoadEvent } from 'primeng/api';

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

}
