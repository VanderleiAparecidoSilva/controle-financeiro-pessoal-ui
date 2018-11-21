import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../seguranca/auth.guard';
import { ContabancariaCadastroComponent } from './contabancaria-cadastro/contabancaria-cadastro.component';
import { ContabancariaPesquisaComponent } from './contabancaria-pesquisa/contabancaria-pesquisa.component';

const routes: Routes = [
  {
    path: 'contabancaria',
    component: ContabancariaPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_CONTABANCARIA'] }
  },
  {
    path: 'contabancaria/nova',
    component: ContabancariaCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_CONTABANCARIA'] }
  },
  {
    path: 'contabancaria/:id',
    component: ContabancariaCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_CONTABANCARIA'] }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ContabancariaRoutingModule { }
