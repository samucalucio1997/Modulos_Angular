import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ModalFormProdutoComponent } from './modal-form-produto/modal-form-produto.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { ReactiveFormsModule } from '@angular/forms';
import { NzOptionComponent, NzSelectModule } from "ng-zorro-antd/select";



@NgModule({
  declarations: [
    ModalFormProdutoComponent
  ],
  imports: [
    CommonModule,
    NzModalModule,
    NzCardModule,
    ReactiveFormsModule,
    NzOptionComponent,
    NzSelectModule
]
})
export class SharedModule { }