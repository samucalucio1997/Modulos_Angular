import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Ng-Zorro Modules
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

import { GerenciarEstoqueRoutingModule } from './gerenciar-estoque-routing.module';
import { ListEstoqueComponent } from './list-estoque/list-estoque.component';
import { CadastrarProdutoComponent } from './cadastrar-produto/cadastrar-produto.component';


@NgModule({
  declarations: [
    ListEstoqueComponent,
    CadastrarProdutoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    GerenciarEstoqueRoutingModule,
    NzTableModule,
    NzCardModule,
    NzSelectModule,
    NzInputNumberModule,
    NzButtonModule,
    NzTagModule,
    NzIconModule,
    NzEmptyModule,
    NzTypographyModule
  ]
})
export class GerenciarEstoqueModule { }
