import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GerenciarEstoqueRoutingModule } from './gerenciar-estoque-routing.module';
import { ListEstoqueComponent } from './list-estoque/list-estoque.component';


@NgModule({
  declarations: [
    ListEstoqueComponent
  ],
  imports: [
    CommonModule,
    GerenciarEstoqueRoutingModule
  ]
})
export class GerenciarEstoqueModule { }
