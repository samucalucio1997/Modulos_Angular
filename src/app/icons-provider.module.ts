import { NgModule } from '@angular/core';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';

import {
  MenuFoldOutline,
  MenuUnfoldOutline,
  FormOutline,
  DashboardOutline,
  PlusOutline,
  CloseCircleOutline,
  EditOutline,
  DeleteOutline,
  ArrowLeftOutline
} from '@ant-design/icons-angular/icons';

const icons = [
  MenuFoldOutline, 
  MenuUnfoldOutline, 
  DashboardOutline, 
  FormOutline,
  PlusOutline,
  CloseCircleOutline,
  EditOutline,
  DeleteOutline,
  ArrowLeftOutline
];

@NgModule({
  imports: [NzIconModule],
  exports: [NzIconModule],
  providers: [
    { provide: NZ_ICONS, useValue: icons }
  ]
})
export class IconsProviderModule { }
