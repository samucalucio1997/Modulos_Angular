import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NzMessageModule } from 'ng-zorro-antd/message';

import { AuthModuleRoutingModule } from './auth-module-routing.module';
import { LoginComponent } from './login/login.component';
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthModuleRoutingModule,
    ReactiveFormsModule,
    GoogleSigninButtonModule,
    FormsModule,
    NzMessageModule
  ]
})
export class AuthModuleModule { }
