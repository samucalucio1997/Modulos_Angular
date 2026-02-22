import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutoListRoutingModule } from './produto-list-routing.module';
import { ProdutoListComponent } from './produto-list.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';


@NgModule({
  declarations: [
    ProdutoListComponent
  ],
  imports: [
    CommonModule,
    ProdutoListRoutingModule,
    NzCardModule,
    NzInputNumberModule,
    NzButtonModule,
    NzInputModule,
    ReactiveFormsModule,
    NzSelectModule
]
})
export class ProdutoListModule { }
