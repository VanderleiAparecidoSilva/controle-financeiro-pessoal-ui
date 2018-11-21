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

import { CurrencyMaskModule } from 'ng2-currency-mask';

import { LancamentoRoutingModule } from './lancamento-routing.module';
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,
    ToolbarModule,
    CalendarModule,
    CurrencyMaskModule,
    SelectButtonModule,
    SpinnerModule,
    InputTextareaModule,
    AutoCompleteModule,

    LancamentoRoutingModule
  ],
  declarations: [LancamentoCadastroComponent]
})
export class LancamentoModule { }
