import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutoListRoutingModule } from './produto-list-routing.module';
import { ProdutoListComponent } from './produto-list.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NgOptimizedImage } from '@angular/common';


@NgModule({
  declarations: [
    ProdutoListComponent
  ],
  imports: [
    CommonModule,
    NgOptimizedImage,
    ProdutoListRoutingModule,
    NzCardModule,
    NzInputNumberModule,
    NzButtonModule,
    NzPaginationModule,
    NzInputModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzCarouselModule
]
})
export class ProdutoListModule { }
