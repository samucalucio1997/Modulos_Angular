import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { RouterModule } from '@angular/router';

import { AuthModuleRoutingModule } from './auth-module-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthModuleRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NzMessageModule,
    RouterModule
  ]
})
export class AuthModuleModule { }
