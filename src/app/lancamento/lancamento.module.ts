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
import {FieldsetModule} from 'primeng/fieldset';
import {CheckboxModule} from 'primeng/checkbox';
import {RadioButtonModule} from 'primeng/radiobutton';
import {SplitButtonModule} from 'primeng/splitbutton';
import {TooltipModule} from 'primeng/tooltip';
import { DynamicDialogModule } from 'primeng/components/dynamicdialog/dynamicdialog';
import { FileUploadModule } from 'primeng/fileupload';
import {DropdownModule} from 'primeng/dropdown';

import { CurrencyMaskModule } from 'ng2-currency-mask';

import { LancamentoRoutingModule } from './lancamento-routing.module';
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { SharedModule } from '../shared/shared.module';
import { LancamentoPesquisaComponent } from './lancamento-pesquisa/lancamento-pesquisa.component';
import { ListaDescricaoLancamentoComponent } from './lancamento-cadastro/lista-descricao-lancamento.component';

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
    FieldsetModule,
    CheckboxModule,
    RadioButtonModule,
    FileUploadModule,
    DropdownModule,
    SplitButtonModule,
    TooltipModule,
    DynamicDialogModule,

    LancamentoRoutingModule
  ],
  declarations: [
    LancamentoCadastroComponent,
    LancamentoPesquisaComponent,
    ListaDescricaoLancamentoComponent
  ],
  entryComponents: [
    ListaDescricaoLancamentoComponent
  ]
})
export class LancamentoModule { }
