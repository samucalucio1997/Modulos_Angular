import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEstoqueComponent } from './list-estoque/list-estoque.component';

const routes: Routes = [{
  path: '',
  component: ListEstoqueComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GerenciarEstoqueRoutingModule { }
