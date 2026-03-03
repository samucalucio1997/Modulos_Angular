import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetalharProdutoRoutingModule } from './detalhar-produto-routing.module';
import { DetalharProdutoComponent } from './detalhar-produto.component';


@NgModule({
  declarations: [
    DetalharProdutoComponent
  ],
  imports: [
    CommonModule,
    DetalharProdutoRoutingModule
  ]
})
export class DetalharProdutoModule { }
