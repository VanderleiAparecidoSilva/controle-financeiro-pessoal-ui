import { Component } from '@angular/core';

import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/api';

import { LancamentoService } from '../lancamento.service';
import { LancamentoFiltroDTO } from '../../../models/domain/lancamentofiltro.dto';

@Component({
  template: `
      <p-table #dt [value]="nomes" [paginator]="true" [rows]="10" [responsive]="true">
          <ng-template pTemplate="header">
              <tr>
                  <th pSortableColumn="nome">Descrição <p-sortIcon field="nome"></p-sortIcon></th>
                  <th style="width:4em"></th>
              </tr>
          </ng-template>
          <ng-template pTemplate="body" let-nome>
              <tr>
                  <td><span class="ui-column-title">Descrição</span>{{nome.nome}}</td>
                  <td>
                      <button pButton icon="pi pi-check" (click)="selectName(nome)"></button>
                  </td>
              </tr>
          </ng-template>
      </p-table>
  `
})
export class ListaDescricaoLancamentoComponent {

  nomes: LancamentoFiltroDTO[];

  frozenCols: any[];

  constructor(private service: LancamentoService, public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  ngOnInit() {
    if (this.config.data) {
      this.service.findAllActiveByType(this.config.data).then(nomes => this.nomes = nomes);
    } else {
      this.service.findAllActive().then(nomes => this.nomes = nomes);
    }
  }

  selectName(name: LancamentoFiltroDTO) {
    this.ref.close(name);
  }
}
