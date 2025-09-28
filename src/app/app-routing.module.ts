import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { 
    path: '',
    redirectTo: '/welcome',
    pathMatch: 'full'
  },
  { 
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth-module/auth-module.module').then(m => m.AuthModuleModule)
  },
  {
    path: 'gerenciar-estoque',
    loadChildren: () => import('./gerenciar-estoque/gerenciar-estoque.module').then(m => m.GerenciarEstoqueModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
