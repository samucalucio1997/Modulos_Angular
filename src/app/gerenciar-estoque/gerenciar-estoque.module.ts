import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSpinModule } from 'ng-zorro-antd/spin';

import { GerenciarEstoqueRoutingModule } from './gerenciar-estoque-routing.module';
import { ListEstoqueComponent } from './list-estoque/list-estoque.component';
import { CadastrarProdutoComponent } from './cadastrar-produto/cadastrar-produto.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { SharedModule } from '../components/shared/shared.module';
import { NzMessageModule } from 'ng-zorro-antd/message';


@NgModule({
  declarations: [
    ListEstoqueComponent,
    CadastrarProdutoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    GerenciarEstoqueRoutingModule,
    NzTableModule,
    NzCardModule,
    NzIconModule,
    NzSelectModule,
    NzInputNumberModule,
    NzButtonModule,
    NzInputModule,
    NzMessageModule,
    NzGridModule,
    NzSpinModule,
    NzModalModule,
    SharedModule,
    ReactiveFormsModule,
    NzTagModule,
    NzIconModule,
    NzEmptyModule,
    NzTypographyModule
  ]
})
export class GerenciarEstoqueModule { }
