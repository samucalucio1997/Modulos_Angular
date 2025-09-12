import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { autorizedAuthGuard } from '../../guard/autorized-auth.guard';

const routes: Routes = [
  { 
    path: '', 
    component: WelcomeComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'tabela', loadChildren: () => import('../../tabela-paciente/tabela-paciente.module').then(m => m.TabelaModule) },
      { path: 'gerenciar-estoque', loadChildren: () => import('../../gerenciar-estoque/gerenciar-estoque.module')
        .then(m => m.GerenciarEstoqueModule), canActivate: [autorizedAuthGuard] },
      { path: 'login', loadChildren: () => import('../../auth-module/auth-module.module').then(m => m.AuthModuleModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomeRoutingModule { }
