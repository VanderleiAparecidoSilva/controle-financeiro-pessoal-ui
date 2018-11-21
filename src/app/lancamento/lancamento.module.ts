import { LancamentoRoutingModule } from './lancamento-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    LancamentoRoutingModule
  ],
  declarations: [LancamentoCadastroComponent]
})
export class LancamentoModule { }
