import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CentrocustoPesquisaComponent } from './centrocusto-pesquisa/centrocusto-pesquisa.component';
import { CentrocustoCadastroComponent } from './centrocusto-cadastro/centrocusto-cadastro.component';

const routes: Routes = [
  { path: 'centrocustos', component: CentrocustoPesquisaComponent },
  { path: 'centrocustos/novo', component: CentrocustoCadastroComponent },
  { path: 'centrocustos/:id', component: CentrocustoCadastroComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CentrocustoRoutingModule { }
