import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/components/button/button';
import { InputTextModule } from 'primeng/inputtext';
import {CalendarModule} from 'primeng/calendar';
import {SelectButtonModule} from 'primeng/selectbutton';
import {SpinnerModule} from 'primeng/spinner';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {InputSwitchModule} from 'primeng/inputswitch';
import { TableModule } from 'primeng/table';

import { CurrencyMaskModule } from 'ng2-currency-mask';

import { LancamentoRoutingModule } from './lancamento-routing.module';
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { SharedModule } from '../shared/shared.module';
import { LancamentoPesquisaComponent } from './lancamento-pesquisa/lancamento-pesquisa.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,

    InputTextModule,
    ButtonModule,
    ToolbarModule,
    CalendarModule,
    CurrencyMaskModule,
    SelectButtonModule,
    SpinnerModule,
    InputTextareaModule,
    AutoCompleteModule,
    InputSwitchModule,
    TableModule,

    LancamentoRoutingModule
  ],
  declarations: [
    LancamentoCadastroComponent,
    LancamentoPesquisaComponent
  ]
})
export class LancamentoModule { }
