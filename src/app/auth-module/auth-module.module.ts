import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NzMessageModule } from 'ng-zorro-antd/message';

import { AuthModuleRoutingModule } from './auth-module-routing.module';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthModuleRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NzMessageModule
  ]
})
export class AuthModuleModule { }
