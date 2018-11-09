import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CentrocustoPesquisaComponent } from './centrocusto-pesquisa/centrocusto-pesquisa.component';
import { CentrocustoCadastroComponent } from './centrocusto-cadastro/centrocusto-cadastro.component';

const routes: Routes = [
  { path: 'centrocusto', component: CentrocustoPesquisaComponent },
  { path: 'centrocusto/novo', component: CentrocustoCadastroComponent },
  { path: 'centrocusto/:id', component: CentrocustoCadastroComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CentrocustoRoutingModule { }
