import { NgModule } from '@angular/core';

import { WelcomeRoutingModule } from './welcome-routing.module';

import { WelcomeComponent } from './welcome.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { IconsProviderModule } from '../../icons-provider.module';
import { Permission } from '../../function/permision';
import { OAuthModule } from 'angular-oauth2-oidc';
import { DetalharProdutoModule } from '../detalhar-produto/detalhar-produto.module';


@NgModule({
  imports: [WelcomeRoutingModule,
        CommonModule,
        DetalharProdutoModule,
        ReactiveFormsModule,
        NzLayoutModule,
        NzMenuModule,
        NzTableModule,
        OAuthModule,
        NzCardModule,
        NzButtonModule,
        IconsProviderModule
  ],
  declarations: [WelcomeComponent, DashboardComponent],
  exports: [WelcomeComponent],
  providers: [Permission]
})
export class WelcomeModule {}
