import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioDinamicosComponent } from './formulario-dinamicos.component';
import { NzTableModule } from 'ng-zorro-antd/table/src/table.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormularioDinamicosRoutingModule } from './formulario-dinamicos-routing.module';






@NgModule({
  declarations: [
    FormularioDinamicosComponent
  ],
  exports:[FormularioDinamicosComponent],
  imports: [
    FormularioDinamicosRoutingModule,
    CommonModule,
    FormsModule
  ]
})
export class FormularioDinamicosModule { }
