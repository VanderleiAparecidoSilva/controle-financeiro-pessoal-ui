import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/components/button/button';
import { ToolbarModule } from 'primeng/toolbar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FileUploadModule } from 'primeng/fileupload';
import { CurrencyMaskModule } from 'ng2-currency-mask';

import { SharedModule } from '../shared/shared.module';
import { ContabancariaPesquisaComponent } from './contabancaria-pesquisa/contabancaria-pesquisa.component';
import { ContabancariaCadastroComponent } from './contabancaria-cadastro/contabancaria-cadastro.component';
import { ContabancariaRoutingModule } from './contabancaria-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    TableModule,
    TooltipModule,
    ButtonModule,
    ToolbarModule,
    FileUploadModule,
    InputSwitchModule,
    SharedModule,
    CurrencyMaskModule,

    ContabancariaRoutingModule
  ],
  declarations: [
    ContabancariaPesquisaComponent,
    ContabancariaCadastroComponent
  ]
})
export class ContabancariaModule { }
