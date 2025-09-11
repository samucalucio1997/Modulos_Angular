import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabelaPacienteComponent } from './tabela-paciente/tabela-paciente.component';
import { autorizedAuthGuard } from './guard/autorized-auth.guard';

const routes: Routes = [
  // { 
  //   path: '**', 
  //   pathMatch: 'full', 
  //   redirectTo: 'welcome'
  // },
  { 
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth-module/auth-module.module').then(m => m.AuthModuleModule)
  },
  {
    path: 'tabela',
    loadChildren: () => import('./tabela-paciente/tabela-paciente.module').then(m => m.TabelaModule),
    canActivate: []
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
