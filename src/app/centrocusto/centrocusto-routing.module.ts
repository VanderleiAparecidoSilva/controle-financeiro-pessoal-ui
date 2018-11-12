import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CentrocustoPesquisaComponent } from './centrocusto-pesquisa/centrocusto-pesquisa.component';
import { CentrocustoCadastroComponent } from './centrocusto-cadastro/centrocusto-cadastro.component';
import { AuthGuard } from './../seguranca/auth.guard';

const routes: Routes = [
  {
    path: 'centrocusto',
    component: CentrocustoPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_CENTROCUSTO'] }
  },
  {
    path: 'centrocusto/novo',
    component: CentrocustoCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_CENTROCUSTO'] }
  },
  {
    path: 'centrocusto/:id',
    component: CentrocustoCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_CENTROCUSTO'] }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CentrocustoRoutingModule { }
