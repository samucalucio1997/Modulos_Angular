import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { autorizedAuthGuard } from '../../guard/autorized-auth.guard';
import { authGuard } from '../../guard/auth.guard';

const routes: Routes = [
  { 
    path: '', 
    component: WelcomeComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'tabela', loadChildren: () => import('../../tabela-paciente/tabela-paciente.module').then(m => m.TabelaModule) },
      { path: 'produtos', loadChildren: () => import('./produto-list/produto-list.module').then(m => m.ProdutoListModule)},
      { path: 'gerenciar-estoque', loadChildren: () => import('../../gerenciar-estoque/gerenciar-estoque.module')
        .then(m => m.GerenciarEstoqueModule), canActivate: [autorizedAuthGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomeRoutingModule { }
