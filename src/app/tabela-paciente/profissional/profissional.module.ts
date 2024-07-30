import { NgModule } from '@angular/core';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CommonModule } from '@angular/common';
import { ModalProfissionalComponent } from './modal-profissional/modal-profissional.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalComponent, NzModalContentDirective, NzModalModule, NzModalService, nzModalAnimations } from 'ng-zorro-antd/modal';
import { FormsModule } from '@angular/forms';





@NgModule({
  declarations: [
    ModalProfissionalComponent
  ],
  imports: [
    CommonModule,
    NzButtonModule,
    NzModalComponent,
    NzSelectModule,
    FormsModule,
    NzModalContentDirective
  ],
  providers: [NzModalService],
  exports: [ModalProfissionalComponent]
})
export class ProfissionalModule { }
