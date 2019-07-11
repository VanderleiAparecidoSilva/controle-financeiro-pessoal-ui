import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './../seguranca/auth.guard';
import { RelatorioCentroCustoComponent } from './relatorio-centro-custo/relatorio-centro-custo.component';
import { RelatorioContaBancariaComponent } from './relatorio-conta-bancaria/relatorio-conta-bancaria.component';
import { RelatorioLancamentoComponent } from './relatorio-lancamento/relatorio-lancamento.component';

const routes: Routes = [
  {
    path: 'relatorio/centrocusto',
    component: RelatorioCentroCustoComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_CENTROCUSTO'] }
  },
  {
    path: 'relatorio/contabancaria',
    component: RelatorioContaBancariaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_CONTABANCARIA'] }
  },
  {
    path: 'relatorio/lancamento/receita',
    component: RelatorioLancamentoComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_LANCAMENTO'] }
  },
  {
    path: 'relatorio/lancamento/despesa',
    component: RelatorioLancamentoComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_LANCAMENTO'] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelatoriosRoutingModule { }
