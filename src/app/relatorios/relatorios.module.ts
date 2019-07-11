import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/components/button/button';
import {SelectButtonModule} from 'primeng/selectbutton';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FieldsetModule } from 'primeng/fieldset';
import { DynamicDialogModule } from 'primeng/components/dynamicdialog/dynamicdialog';

import { SharedModule } from '../shared/shared.module';
import { RelatoriosRoutingModule } from './relatorios-routing.module';
import { RelatorioCentroCustoComponent } from './relatorio-centro-custo/relatorio-centro-custo.component';
import { RelatorioContaBancariaComponent } from './relatorio-conta-bancaria/relatorio-conta-bancaria.component';
import { RelatorioLancamentoComponent } from './relatorio-lancamento/relatorio-lancamento.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,

    ButtonModule,
    SelectButtonModule,
    CalendarModule,
    InputTextModule,
    RadioButtonModule,
    FieldsetModule,
    DynamicDialogModule,

    RelatoriosRoutingModule
  ],
  declarations: [
    RelatorioCentroCustoComponent,
    RelatorioContaBancariaComponent,
    RelatorioLancamentoComponent
  ]
})
export class RelatoriosModule { }
