import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabelaPacienteComponent } from './tabela-paciente/tabela-paciente.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) },
  {
    path: 'tabela',
    loadChildren: () => import('./tabela-paciente/tabela-paciente.module').then(m => m.TabelaModule) 
  },
  { 
    path: 'formularioapp', 
    loadChildren: () => import('./formulario-dinamicos/formulario-dinamicos.module').then(m => m.FormularioDinamicosModule),
    data: { breadcrumb: 'Formulário Dinâmico' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
