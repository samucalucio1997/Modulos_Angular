import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ModalFormProdutoComponent } from './modal-form-produto/modal-form-produto.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { ReactiveFormsModule } from '@angular/forms';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzOptionComponent, NzSelectModule } from "ng-zorro-antd/select";
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { RelatorioComponent } from './relatorio/relatorio.component';



@NgModule({
  declarations: [
    ModalFormProdutoComponent,
    RelatorioComponent
  ],
  imports: [
    CommonModule,
    NzModalModule,
    NzCardModule,
    ReactiveFormsModule,
    NzIconModule,
    NzUploadModule,
    NzOptionComponent,
    NzButtonModule,
    NzSelectModule,
    NzMessageModule
],
schemas: [
  CUSTOM_ELEMENTS_SCHEMA
]
})
export class SharedModule { }