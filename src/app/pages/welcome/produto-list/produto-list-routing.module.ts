import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdutoListComponent } from './produto-list.component';

const routes: Routes = [
  {
    path: '', component: ProdutoListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutoListRoutingModule { }
