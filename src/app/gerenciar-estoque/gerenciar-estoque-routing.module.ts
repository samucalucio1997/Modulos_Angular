import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEstoqueComponent } from './list-estoque/list-estoque.component';
import { CadastrarProdutoComponent } from './cadastrar-produto/cadastrar-produto.component';

const routes: Routes = [{
  path: '',
  component: ListEstoqueComponent
},
{
  path:'cadastrar-produto',
  component: CadastrarProdutoComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GerenciarEstoqueRoutingModule { }
