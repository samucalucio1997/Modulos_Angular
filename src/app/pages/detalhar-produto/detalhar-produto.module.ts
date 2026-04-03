import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetalharProdutoRoutingModule } from './detalhar-produto-routing.module';
import { DetalharProdutoComponent } from './detalhar-produto.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTabsModule } from 'ng-zorro-antd/tabs';


@NgModule({
  declarations: [
    DetalharProdutoComponent
  ],
  imports: [
    CommonModule,
    DetalharProdutoRoutingModule,
    NzTableModule,
    NzCardModule,
    NzGridModule,
    NzImageModule,
    NzDividerModule,
    NzTypographyModule,
    NzBadgeModule,
    NzSpaceModule,
    NzButtonModule,
    NzIconModule,
    NzTabsModule,
  ]
})
export class DetalharProdutoModule { }
