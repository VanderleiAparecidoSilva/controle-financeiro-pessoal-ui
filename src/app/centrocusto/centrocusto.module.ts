import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/components/button/button';
import { DropdownModule } from 'primeng/dropdown';
import { ToolbarModule } from 'primeng/toolbar';
import { FieldsetModule } from 'primeng/fieldset';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FileUploadModule } from 'primeng/fileupload';

import { SharedModule } from '../shared/shared.module';
import { CentrocustoPesquisaComponent } from './centrocusto-pesquisa/centrocusto-pesquisa.component';
import { CentrocustoCadastroComponent } from './centrocusto-cadastro/centrocusto-cadastro.component';
import { CentrocustoRoutingModule } from './centrocusto-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    TableModule,
    TooltipModule,
    ButtonModule,
    DropdownModule,
    ToolbarModule,
    FieldsetModule,
    FileUploadModule,
    InputSwitchModule,
    SharedModule,

    CentrocustoRoutingModule
  ],
  declarations: [
    CentrocustoPesquisaComponent,
    CentrocustoCadastroComponent
  ],
  exports: []
})
export class CentrocustoModule { }
