import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalharProdutoComponent } from './detalhar-produto.component';

const routes: Routes = [
  {
    path: '', component: DetalharProdutoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetalharProdutoRoutingModule {}
