import { NgModule } from '@angular/core';

import { WelcomeRoutingModule } from './welcome-routing.module';

import { WelcomeComponent } from './welcome.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTableModule } from 'ng-zorro-antd/table';
import { IconsProviderModule } from '../../icons-provider.module';


@NgModule({
  imports: [WelcomeRoutingModule,
        CommonModule,
        ReactiveFormsModule,
        NzLayoutModule,
        NzMenuModule,
        NzTableModule,
        IconsProviderModule
  ],
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent]
})
export class WelcomeModule {}
